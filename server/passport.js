const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const TwitterTokenStrategy = require('passport-twitter-token');
const config = require('./config/secret_key');
const config_social = require('./config/social_networks');
const User = require('./models/user');


// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.JWT_SECRET,
  requestProperty: 'auth',
  getToken: function(req) {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    }
    return null;
  }
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));


passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: config_social.oauth.facebook.clientID,
  clientSecret: config_social.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {

    const existingUser = await User.findOne({"facebook.id": profile.id});
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName
      }
    });

    // save our user to the database
    await newUser.save((err) => {
      if (err)
        throw err;
      // if successful, return the new user
      return done(null, newUser);
    });
  } catch (error) {
    done(error, false, error.message);
  }
}));


passport.use('twitterToken', new TwitterTokenStrategy({
  consumerKey: config_social.oauth.twitter.consumerKey,
  consumerSecret: config_social.oauth.twitter.consumerSecret,
  includeEmail: true
}, async (token, tokenSecret, profile, done) => {

  User.upsertTwitterUser(token, tokenSecret, profile, (err, user) => {
    return done(err, user);
  });

}));


// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user given the email
    const user = await User.findOne({"local.email": email});

    // If not, handle it
    if (!user) {
      return done(null, false);
    }

    // Check if the password is correct
    const isMatch = await user.isValidPassword(password);

    // If not, handle it
    if (!isMatch) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch (error) {
    done(error, false);
  }
}));