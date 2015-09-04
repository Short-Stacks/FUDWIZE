var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://user:pass@localhost/database');

var User = new Schema ({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  }

  contactInfo: {
    type: Object,
    required: true
  },

  websiteUrl: {
    type: String
  },

  additional: {
    type: Object
  },

  connections: {
    type: Array
  },

  foodData: {
    type: Object
  }

  salt: String
});



module.exports = app;