const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/secret_key');

signToken = user => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, JWT_SECRET);
};

module.exports = {
  signUp: async (req, res, next) => {
    const {email, password, first_name, last_name, phone} = req.value.body;

    //If User with the same email
    const foundUser = await User.findOne({"local.email": email});
    if (foundUser) {
      return res.status(403).json({error: "Email is already in use!"})
    }

    //Create a new User
    const newUser = new User({
      method: 'local',
      local: {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        phone: phone
      }
    });
    await newUser.save();

    //Generate token
    const token = signToken(newUser);

    //Respond with token
    res.status(200).json({
      success: true,
      token
    })
  },

  signIn: async (req, res, next) => {
    //Generate token
    const token = signToken(req.user);
    //Respond with token
    res.status(200).json({
      success: true,
      token
    })
  },

  facebookOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    //Respond with token
    res.status(200).json({
      success: true,
      token
    })
  },

  generateToken: (req, res, next) => {
    req.token = signToken(req.user);
    return next();
  },

  sendToken: (req, res) => {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
  },

  secret: async (req, res, next) => {
    res.json({secret: "resource"});
  },
};