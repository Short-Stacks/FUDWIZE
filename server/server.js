var express = require('express');
var mongoose = require('mongoose');
var app = express();
var path = require('path');
var User = require('./users/userModel.js');
// var jwt = require('jwt-simple');

var cors = require('cors');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://user:pass@localhost/api');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

//a post request to post new use info to db
app.post('/signup/:type', function(req, res) {
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
        // next(new Error('User Already Exists'));
        console.log('user', 'hello');
      } 
      else {
        var newUser = new User({
          username: username,
          password: password,
          type: type,
          contactInfo: contactInfo,
          websiteUrl: websiteUrl,
          additional: additional,
          foodData: foodData
        });
        console.log('newUser', newUser);
        newUser.save(function(err) {
          console.log('hi');
          if (err) {
            console.log('error');
          }
          // console.log(user);
          // next();
        });
      }
    });
});
//post request to verify the user info
app.post('/login', function(req, res) {

  var password = req.body.password;
  var username = req.body.username

  User.findOne({
    username: username
  })
    .then(function(user) {
      if (user) {
        if (User.verifyPassword(password)) {
          next();
        }
        else {
          console.log('not valid password');
        }
      }
    });
});
//---------------------------------------------

app.get('/rst/:username', function(req, res) {
  var username = req.params.username;
  var data = req.body;
  if (username) {
    User.findOne({ username: username }, function(err, docs) {
      if (err) {
        return next(err);
      }
      res.json(docs);
    });
  }
});

app.get('/fbk/:username', function(req, res) {
  var username = req.params.username;
  var data = req.body;
  // res.render('fbk/:'+username);
  if (username) {
    User.findOne({ username: username }, function(err, docs) {
      if (err) {
        return next(err);
      }
      res.json(docs);
    });
  }
});

app.get('/dash/:username', function(req, res) {
  var username = req.params.username;
  var data = req.body;
  if (username) {
    User.findOne({ username: username }, function(err, docs) {
      if (err) {
        return next(err);
      }
      res.json(docs);
    });
  }
});

var port = process.env.PORT || 3000; 
var server = app.listen(port, function() {
  var host = server.address().address;
  var p = server.address().port;
  console.log('listening at http://%s:%s', host, p);
});

module.exports = app;
