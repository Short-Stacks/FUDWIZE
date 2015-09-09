var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema ({
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
  },
  contactInfo: {
    type: {},
    required: true
  },
  websiteUrl: {
    type: String
  },
  additional: {
    type: {}
  },
  connections: {
    type: Array
  },
  foodData: {
    type: {}
  }
  // salt: {
  //   type: String
  // }
  //add messages/notifications field to/from foodbanks
});


module.exports = mongoose.model('User', UserSchema);
