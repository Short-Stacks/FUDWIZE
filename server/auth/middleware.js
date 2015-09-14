var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var SALT_WORK_FACTOR = 10;
var tokenCode = 'secret';


exports.verifyPassword = function(attemptedPassword, savedPassword, cb) {
  var result;
  bcrypt.compare(attemptedPassword, savedPassword, function(err, res) {
    cb(res);
  });
};

exports.hashPassword = function(userPassword, cb) {
  var salt;
  var hash;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }
    //encrypt the user's inputted password with the generated salt mixed in to make it nice and savory
    bcrypt.hash(userPassword, salt, null, function(err, hash) {
      return cb(hash);
    });
  });
};

exports.checkToken = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var user;
  var tokenObj = JSON.parse(token);

  if (!tokenObj.token) {
    return res.status(403).send({
      success: 'false',
      message: 'no token provided'
    }); // send forbidden if a token is not provided
  }

  try {
    // decode token and attach user to the request
    // for use inside our controllers
    user = jwt.decode(tokenObj.token, 'secret');
    req.user = user;
    next();
  } catch (error) {
    res.status(403).send({
      success: 'false',
      message: 'invalid token'
    });
  }
};

exports.sendToken = function(req, res, user){
  var token = jwt.encode(user, tokenCode);
  res.status(201);
  res.json({
    type: user.type,
    username: user.username,
    token: token
  });
};
