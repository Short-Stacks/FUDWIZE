var express = require('express');
var mongoose = require('mongoose');
var app = express();
var path = require('path');
var User = require('./users/userModel.js');
var Auth = require('./auth/middleware.js');
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

var database = process.env.MONGOLAB_URI || 'mongodb://localhost/fudwize';

mongoose.connect(database, function (error) {
    if (error) {
      console.error(error);
    }
    else {
      console.log('mongo connected');
    }
});

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

  User.findOne({
    username: username
  })
    .then(function(user) {
      if (user) {
        console.log('user already exists');
        res.status(401).send();
      } else {
        Auth.hashPassword(password, function(hashedPassword) {

          var newUser = new User({
            username: username,
            password: hashedPassword,
            type: type,
            contactInfo: contactInfo,
            websiteUrl: websiteUrl,
            additional: additional,
            foodData: foodData,
            connections: []
          });
          // newUser.password = newUser.hashPassword(password);
          newUser.save(function(err) {
            if (err) {
              console.log(err);
            }
          })
            .then(function(user) {
              // create token to send back for auth
              Auth.sendToken(req, res, user);
            });
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
        Auth.verifyPassword(password, user.password, function(bool) {
          if (bool) {
            console.log('password matches');
            Auth.sendToken(req, res, user);
          }
          else {
            console.log('password doesnt match');
            res.status(401).send();
          }
        });
      }
      else{
        console.log('user doesnt exist');
        res.status(401).send();
      }
    });
});

app.get('/profile/:type/:username', Auth.checkToken, function(req, res, next) {
  var username = req.params.username;
  var type = req.params.type;

  if (req.user.type !== type || req.user.username !== username) {
    res.status(403).send();
  }
  else {
    User.findOne({username: username}, getFields, function(err, user) {
      if (err) {
        return next(err);
      }
      res.status(200).send(user);
    });
  }

});

app.get('/profile/:type/:username/connections', Auth.checkToken, function(req, res, next) {
  var username = req.params.username;


  User.findOne({ username: username }, function(err, user) {
    if (err) {
      console.log(err);
    }
    else {
      var connections = user.connections;
      var responseData = [];
      for (var i = 0; i < connections.length; i++) {
        User.findOne({ username: connections[i] }, getFields, function(err, user) {
          if (err) {
            console.log(err);
          }
          else {
            responseData.push(user);
            if (responseData.length == connections.length) {
              res.status(200).send(responseData);
            }
          }
        });
      }
    }
  });
});

app.post('/profile/:type/:username', Auth.checkToken, function(req, res, next) {
  var username = req.params.username;
  var updateData = req.body;

  //find the user and update the appropriate fields
  User.findOne({ username: username }, function(err, user) {
    user.foodData = updateData.foodData;
    user.connections = updateData.connections;

    //Mongoose requires that any "schema-less" storage items, such as objects, be marked
    //as modified so that Mongoose knows to save the contents of these items
    user.markModified(updateData);
    user.save();
  });
});


app.get('/dash/:username', Auth.checkToken, function(req, res, next) {
  var username = req.params.username;
  var response_obj = {};
  if (req.user.type !== 'fbk' || req.user.username !== username) {
    res.status(403).send();
  } else {
    User.find({type: 'rst'}, getFields, function(err, users) {
      if (err) {
       console.log(err);
      }
      response_obj.rst = users;

      User.findOne({username: username}, getFields, function(err, user) {
        if (err) {
          console.log(err);
        }
        response_obj.fbk = user;
        res.status(200).send(response_obj);
      });
    });
  }
});

app.post('/dash/:username/connections',Auth.checkToken, function(req, res, next) {
  var username = req.params.username;
  var newConnection = req.body.rstUsername;

  User.findOne({ username: username }, function(err, user) {
    if (err) {
      console.log(err);
    }
    else {
      //will add the new connection's username to this user's connections array in storage
      user.connections.push(newConnection);
      user.markModified(user.connections);
      user.save();
    }
  });
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('listening at http://localhost:' + port);
});

module.exports = app;

