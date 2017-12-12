const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const request = require('request');

const {validateBody, schemas} = require('../helpers/routeHelpers');
const UsersController = require('../controllers/authenticate_controller');
const passportSignIn = passport.authenticate('local', {session: false});
const passportJWT = passport.authenticate('jwt', {session: false});
const config_social = require('../config/social_networks');

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema), passportSignIn, UsersController.signIn);

router.route('/oauth/facebook')
  .post(passport.authenticate('facebookToken', {session: false}), UsersController.facebookOAuth);

router.route('/oauth/twitter')
  .post((req, res, next) => {
    request.post({
      url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
      oauth: {
        consumer_key: config_social.oauth.twitter.consumerKey,
        consumer_secret: config_social.oauth.twitter.consumerSecret,
        token: req.query.oauth_token
      },
      form: {oauth_verifier: req.query.oauth_verifier}
    }, function (err, r, body) {

      if (err) {
        return res.send(500, {message: err.message});
      }

      const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      const parsedBody = JSON.parse(bodyString);

      req.body['oauth_token'] = parsedBody.oauth_token;
      req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
      req.body['user_id'] = parsedBody.user_id;

      next();
    });
  }, passport.authenticate('twitterToken', {session: false}), (req, res, next) => {

    if (!req.user) {
      return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
      id: req.user.id
    };

    return next();
  }, UsersController.generateToken, UsersController.sendToken);


router.route('/oauth/twitter/reverse')
  .post((req, res) => {
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
        consumer_key: config_social.oauth.twitter.consumerKey,
        consumer_secret: config_social.oauth.twitter.consumerSecret,
      }
    }, (err, r, body) => {
      if (err) {
        return res.send(500, {message: err.message});
      }


      let jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    });
  });


router.route('/secret')
  .get(passportJWT, UsersController.secret);


module.exports = router;