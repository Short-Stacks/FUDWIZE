var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

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
  },
  salt: {
    type: String
  }
  //add messages/notifications field to/from foodbanks
});

//set up method to compare login password with stored encrypted password
UserSchema.methods.verifyPassword = function(attemptedPassword) {
  var savedPassword = this.password;
  console.log('password', this.password);
  var result;
  bcrypt.compare(attemptedPassword, savedPassword, function(err, match) {
    result = match;
  })
  return result;
}

//before a new user is saved to database, create encrypted password using bcrypt
// UserSchema.pre('save', function(next) {
//   var user = this;
//   console.log('user', user);
//   if (!user.isModified('password')) {
//     return next();
//   }

//   //generate the saltiest of salts
//   bcrypt.genSalt(function(err, result) {
//     if (err) {
//       return next(err);
//     }
//     user.salt = result;
//     console.log('user.salt', user.salt);
//   })

//   //encrypt the user's inputted password with the generated salt mixed in to make it nice and savory
//   bcrypt.hash(user.password, user.salt, null, function(err, hash) {
//     user.password = hash;
//     next();
//   })

// })

module.exports = mongoose.model('User', UserSchema);
