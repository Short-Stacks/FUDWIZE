var express = require('express');
var mongoose = require('mongoose');
var app = express();
var path = require('path');
var User = require('./users/userModel.js');
var Auth = require('./auth/middleware.js');
var cors = require('cors');
var bodyParser = require('body-parser');

//starts up our mongo environment on either heroku or locathost
var database = process.env.MONGOLAB_URI || 'mongodb://localhost/fudwize';
mongoose.connect(database, function(error) {
  if (error) {
    console.error(error);
  }
  else {
    console.log('mongo connected');
  }
});

//use cors json bodyparser and serve client files
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client')));

//only fields specified with "1"  will be retrieved from the mongoDB and sent to client
var getFields = {
  '_id': 0,
  'username': 1,
  'type': 1,
  'contactInfo': 1,
  'websiteUrl': 1,
  'additional': 1,
  'connections': 1,
  'foodData': 1,
  'imageUrl': 1
};



//handles a new user signup, type param can be either 'rst' or 'fbk'
app.post('/signup/:type', function(req, res, next) {
  var data = req.body;
  var username = data.username;

  //if the username already exists, respond 401
  User.findOne({
    username: username
  })
    .then(function(user) {
      if (user) {
        console.log('user already exists');
        res.status(401).send();
      }
      else {
        //otherwise, encrypt password and save the listed information to database
        var type = req.params.type;
        var password = data.password;
        var contactInfo = data.contactInfo;
        var websiteUrl = data.websiteUrl;
        var additional = data.additional;
        var foodData = data.foodData;
        var imageUrl = data.imageUrl;

        Auth.hashPassword(password, function(hashedPassword) {

          //create new user in mongoose ORM
          var newUser = new User({
            username: username,
            password: hashedPassword,
            type: type,
            contactInfo: contactInfo,
            websiteUrl: websiteUrl,
            additional: additional,
            foodData: foodData,
            connections: [],
            imageUrl: imageUrl
          });
          //save user to mongoDB
          newUser.save(function(err) {
            if (err) {
              console.log(err);
            }
          })
            .then(function(user) {
              // create token to send back for future auth
              Auth.sendToken(req, res, user);
            });
        });
      }
    });
});


//post request to verify the user info
app.post('/login', function(req, res, next) {
  var username = req.body.username;

  //check to see if user exists
  User.findOne({
    username: username
  })
    .then(function(user) {
      if (user) {
        var password = req.body.password;

        //check to see if input password matches decrypted password in database
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
      else {
        console.log('user doesnt exist');
        res.status(401).send();
      }
    });
});

//handles get requests to profile path with type and username routeparams
app.get('/profile/:type/:username', Auth.checkToken, function(req, res, next) {
  var username = req.params.username;
  var type = req.params.type;

  //if params do not match information on token, respond 403
  if (req.user.type !== type || req.user.username !== username) {
    res.status(403).send();
  }
  else {
    //extract only specified 'getFields' from database and send to client
    User.findOne({
      username: username
    }, getFields, function(err, user) {
      if (err) {
        return next(err);
      }
      res.status(200).send(user);
    });
  }

});

/*
this get request will be sent by foodbanks only in order to retrieve 'rst' information
and list them under the "connections" section of their profile
*/
app.get('/profile/:type/:username/connections', Auth.checkToken, function(req, res, next) {
  var username = req.params.username;


  User.findOne({
    username: username
  }, function(err, user) {
    if (err) {
      console.log('user doesnt exist');
      res.status(401).send();
    }
    else {
      var connections = user.connections;
      var responseData = [];
      //loop through all the users connections and get each 'rst' data
      if (connections.length < 1) {
        res.status(200).send();
      }
      else {
        for (var i = 0; i < connections.length; i++) {
          User.findOne({
            username: connections[i]
          }, getFields, function(err, user) {
            if (err) {
              console.log(err);
            }
            else {
              //push 'rst' data to responseData array
              responseData.push(user);
              //once all connections have been added, send response to client
              if (responseData.length === connections.length) {
                res.status(200).send(responseData);
              }
            }
          });
        }
      }
    }
  });
});

//handles user profile updates
app.post('/profile/:type/:username', Auth.checkToken, function(req, res, next) {
  var username = req.params.username;
  var updateData = req.body;

  //find the user and update the appropriate fields
  User.findOne({
    username: username
  }, function(err, user) {
    user.foodData = updateData.foodData;
    user.connections = updateData.connections;

    //Mongoose requires that any "schema-less" storage items, such as objects, be marked
    //as modified so that Mongoose knows to save the contents of these items
    user.markModified(updateData);
    user.save();
    res.status(201).send();
  });
});

//handles dashboard requests for 'fbk' only
app.get('/dash/:username', Auth.checkToken, function(req, res, next) {
  var username = req.params.username;
  var response_obj = {};

  //if usernames dont match or user is a 'rst', respond 403
  if (req.user.type !== 'fbk' || req.user.username !== username) {
    res.status(403).send();
  }
  else {
    //get all 'rst' users and add them to the response_obj
    User.find({
      type: 'rst'
    }, getFields, function(err, users) {
      if (err) {
        console.log('no restaurants exist in db');
        res.status(401).send();
      }
      response_obj.rst = users;

      //get the current 'fbk' users info and add them to the response_obj, then send response
      User.findOne({
        username: username
      }, getFields, function(err, user) {
        if (err) {
          console.log('user doesnt exist');
          res.status(401).send();
        }
        response_obj.fbk = user;
        res.status(200).send(response_obj);
      });
    });
  }
});

//handles new connections made between a 'fbk' and restaurants
app.post('/dash/:username/connections', Auth.checkToken, function(req, res, next) {
  var username = req.params.username;
  var newConnection = req.body.rstUsername;

  User.findOne({
    username: username
  }, function(err, user) {
    if (err) {
      console.log('user doesnt exist');
      res.status(401).send();
    }
    else {
      //will add the new connection's username to this user's connections array in storage
      user.connections.push(newConnection);

      //because it is an array/object, must mark as modified as save so that Mongoose recognizes the change
      user.markModified(user.connections);
      user.save();
      res.status(201).send();
    }
  });
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('listening at http://localhost:' + port);
});

module.exports = app;

