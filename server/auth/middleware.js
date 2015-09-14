var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var SALT_WORK_FACTOR = 10;
var tokenCode = 'secret';

//verifies if password is the same, then executes callback passing in boolean true or false
exports.verifyPassword = function(attemptedPassword, savedPassword, cb) {
  bcrypt.compare(attemptedPassword, savedPassword, function(err, res) {
    cb(res);
  });
};

//encrypt the user's inputted password with the generated salt using a factor of 10
exports.hashPassword = function(userPassword, cb) {
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(userPassword, salt, null, function(err, hash) {
      return cb(hash);
    });
  });
};

/*
checks for token object, decodes tokenCode and attaches the decoded username to the
req.user property for the server to compare to the username requested in the path url
*/
exports.checkToken = function(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var tokenUsername;
  var tokenObj = JSON.parse(token);

  if (!tokenObj.token) {
    return res.status(403).send({
      success: 'false',
      message: 'no token provided'
    });
  }

  try {
    // decode token and attach user to the request
    // for use inside our controllers
    tokenUsername = jwt.decode(tokenObj.token, 'secret');
    req.user = tokenUsername;
    next();
  } catch (error) {
    res.status(403).send({
      success: 'false',
      message: 'invalid token'
    });
  }
};

/*
server generates encoded tokenCode and sends token object to user "type",
"username", and "token" are sent so that angular route interceptors know
what access the token allows. (i.e. type='rst' get access to dashboard view)
*/
exports.sendToken = function(req, res, user) {
  var token = jwt.encode(user, tokenCode);
  res.status(201);
  res.json({
    type: user.type,
    username: user.username,
    token: token
  });
};
