const mongoose = require('mongoose');

// mongodb connection url
const mongoURL = 'mongodb://127.0.0.1:27017/hotels';

mongoose.connect(mongoURL);

// default connection
const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to mongodb server');
});

db.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

module.exports = db;
