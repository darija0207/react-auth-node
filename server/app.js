const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const history = require('connect-history-api-fallback');
const cors = require('cors');

//Config
const config = require('./config/config');
config.setConfig();
const corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};

//Webpack
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);

//Models
User = require('./models/user');
Employer = require('./models/employer');

const app = express();
app.use(cors(corsOption));

//Setup Webpack
app.use(require("webpack-dev-middleware")(compiler));

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

//API GET from file
const usersFilePath = path.join(__dirname, '../data/hydra-vaction.json');

app.get('/api/employers', (req, res) => {
  const readable = fs.createReadStream(usersFilePath);
  readable.pipe(res);
});

app.get('/api/user/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user){
        return res.status(404).end();
      }
      return res.status(200).json(user)
    })
    .catch(err => next(err));
});

app.get('/api/users', (req, res) => {
  User.find({}, (err, users) => {
    if(err){
      res.send('Something went really wrong!');
      next();
    }
    res.json(users);
  })
});


// Serve static assets
app.use(history());
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Connect to Mongoose
mongoose.connect(process.env.MONGOOSE_CONNECT, {useMongoClient: true});
mongoose.Promise = global.Promise;

// API GET
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// Routes
app.use('/api/users', require('./routes/users'));

module.exports = app;