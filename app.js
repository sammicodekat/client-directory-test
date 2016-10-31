// // LOAD ENV VARIABLES
// require('dotenv').config();

// SET SERVER PORT
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/more-mongoose'

// REQUIRES
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, err => {
  console.log(err || `MongoDB connected to ${MONGODB_URI}`)
})
// APP DECLARATION
const app = express();

// GENERAL MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('build'));

// ROUTES
app.use('/api', require('./routes/api'));

app.get('/', (req, res) => {
  let filepath = path.resolve('index.html');
  res.sendFile(filepath);
});

// SERVER LISTEN
app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
