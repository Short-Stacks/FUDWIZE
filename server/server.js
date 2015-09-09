var express = require('express');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var app = express();
var path = require('path');
var User = require('./users/userModel.js');
var jwt = require('jwt-simple');

var cors = require('cors');
var bodyParser = require('body-parser');
var getFields = {
  '_id': 0,
  'username': 1,
  'type': 1,
  'contactInfo': 1,
  'websiteUrl': 1,
  'additional': 1,
  'connections': 1,
  'foodData': 1
};


// mongoose.connect('mongodb://user:pass@localhost/api');
mongoose.connect('mongodb://localhost/fudwize');
var SALT_WORK_FACTOR = 10;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../client')));


//a post request to post new use info to db
app.post('/signup/:type', function(req, res, next) {
  //getting the type of the user, either rest or foodbank
  var type = req.params.type;
  var data = req.body;
  var username = data.username;
  var password = data.password;
  var contactInfo = data.contactInfo;
  var websiteUrl = data.websiteUrl;
  var additional = data.additional;
  var foodData = data.foodData;

  console.log("username is ", username);
  User.findOne({
    username: username
  })
    .then(function(user) {
      if (user) {
        console.log('user already exists');
      }
      else {
        hashPassword(password, function(hashPassword){

          var newUser = new User({
            username: username,
            password: hashPassword,
            type: type,
            contactInfo: contactInfo,
            websiteUrl: websiteUrl,
            additional: additional,
            foodData: foodData,
            connections: []
          });
          // newUser.password = newUser.hashPassword(password);
          console.log('newUser', newUser);
          newUser.save(function(err) {
            if (err) {
              console.log('error');
            }
          })
          .then(function (user) {
          // create token to send back for auth
            var token = jwt.encode(user, 'secret');
            console.log('res',res);
            console.log('token', token);
            res.status(201);
            res.json({type: type,
              username: username,
              token: token});
          });
          // .fail(function (error) {
          //   next(error);
          // });
        });

      }
    });
});


//post request to verify the user info
app.post('/login', function(req, res, next) {

  var password = req.body.password;
  var username = req.body.username;

  User.findOne({
    username: username
  })
    .then(function(user) {
      if (user) {
        verifyPassword(password, user.password, function(bool){
          if(bool){
            console.log('password matches');
            var token = jwt.encode(user, 'secret');
            console.log('res',res);
            console.log('token', token);
            res.status(201);
            res.json({type: user.type,
              username: user.username,
              token: token});
            // res.status(201).send();

          }else{
            console.log('password doesnt match');
            res.status(404).send();
          }


        });
      }
    });
});

app.get('/profile/:type/:username', function(req, res, next) {
  var username = req.params.username;
  console.log('username', username);
  if (username) {
    User.findOne({ username: username }, getFields, function(err, user) {
      if (err) {
        return next(err);
      }
      console.log(user);
      res.status(200).send(user);
    });
  }
});


app.get('/dash/:username', function(req, res, next) {
  var username = req.params.username;
  if (username) {
    User.find({ type: 'rst' }, getFields, function(err, users) {
      if (err) {
        return next(err);
      }
      console.log(users);
      res.status(200).send(users);

    });
  }
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('listening at http://localhost:' + port);
});

module.exports = app;

function verifyPassword(attemptedPassword, savedPassword, cb) {
  var result;
  bcrypt.compare(attemptedPassword, savedPassword, function(err, res) {
    cb(res);
  });
}

function hashPassword(userPassword, cb){
  var salt;
  var hash;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }
    console.log('hi');
    //encrypt the user's inputted password with the generated salt mixed in to make it nice and savory
    bcrypt.hash(userPassword, salt, null, function(err, hash) {
      return cb(hash);
    });
  });
}

function checkToken(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var user;

  if (!token) {
    return res.status(403).send({
      success: 'false',
      message: 'no token provided'
    }); // send forbidden if a token is not provided
  }

  try {
    // decode token and attach user to the request
    // for use inside our controllers
    user = jwt.decode(token, tokenCode);
    req.user = user;
    next();
  } catch(error) {
    return next(error);
  }
}
