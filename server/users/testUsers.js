var mongoose = require('mongoose');
var User = require('./userModel.js');

var SALT_WORK_FACTOR = 10;

var createTestUsers = function(hashPassword) {

  // Remove any prior instances of testUsers

  User.remove({username: 'chipotle'}, function(err) {
    if (err) {
      console.log("Unable to delete chipotle");
    } 
    else {
      console.log("chipotle removed");
    }
  });

  User.remove({username: 'mehfils'}, function(err) {
    if (err) {
      console.log("Unable to delete mehfils");
    } 
    else {
      console.log("mehfils removed");
    }
  });

  User.remove({username: 'steffs'}, function(err) {
    if (err) {
      console.log("Unable to delete steffs");
    } 
    else {
      console.log("steffs removed");
    }
  });

  User.remove({username: 'sfFoodBank'}, function(err) {
    if (err) {
      console.log("Unable to delete sfFoodBank");
    } 
    else {
      console.log("sfFoodBank removed");
    }
  });

  User.remove({username: 'oaklandFoodBank'}, function(err) {
    if (err) {
      console.log("Unable to delete oaklandFoodBank");
    } 
    else {
      console.log("oaklandFoodBank removed");
    }
  });

  User.remove({username: 'sausalitoFoodBank'}, function(err) {
    if (err) {
      console.log("Unable to delete sausalitoFoodBank");
    } 
    else {
      console.log("sausalitoFoodBank removed");
    }
  });

  hashPassword('chipotle', function(hashPassword) {
    var chipotle = new User({
      username: 'chipotle',
      password: hashPassword,
      type: 'rst',
      contactInfo: {
        name: 'Chipotle',
        phoneNumber: "415-555-TACO",
        email: 'chipotle@chipotle.com'
      },
      websiteUrl: 'www.chipotle.com',
      additional: {
        aboutUs: 'We make yummy burritos.'
      },
      connections: [],
      foodData: {},
    });
    chipotle.save();
  });

  hashPassword('mehfils', function(hashPassword) {
    var mehfils = new User({
      username: 'mehfils',
      password: hashPassword,
      type: 'rst',
      contactInfo: {
        name: 'Mehfils',
        phoneNumber: "415-555-LAMB",
        email: 'mehfils@mehfils.com'
      },
      websiteUrl: 'www.mehfils.com',
      additional: {
        aboutUs: 'Have you tried our goat?'
      },
      connections: [],
      foodData: {},
    });
    mehfils.save();
  });

  hashPassword('steffs', function(hashPassword) {
    var steffs = new User({
      username: 'steffs',
      password: hashPassword,
      type: 'rst',
      contactInfo: {
        name: 'Steffs Bar',
        phoneNumber: "415-555-BEER",
        email: 'steffs@steffs.com'
      },
      websiteUrl: 'www.steffs.com',
      additional: {
        aboutUs: 'We have hot dogs. Mostly beer though.'
      },
      connections: [],
      foodData: {},
    });
    steffs.save();
  });

  hashPassword('sfFoodBank', function(hashPassword) {
    var sfFoodBank = new User({
      username: 'sfFoodBank',
      password: hashPassword,
      type: 'fbk',
      contactInfo: {
        name: 'SF Food Bank',
        phoneNumber: "415-555-BANK",
        email: 'sfFoodBank@sfFoodBank.org'
      },
      websiteUrl: 'www.sfFoodBank.org',
      additional: {
        aboutUs: 'We need some food yo.'
      },
      connections: [],
      foodData: {},
    });
    sfFoodBank.save();
  });

  hashPassword('oaklandFoodBank', function(hashPassword) {
    var oaklandFoodBank = new User({
      username: 'oaklandFoodBank',
      password: hashPassword,
      type: 'fbk',
      contactInfo: {
        name: 'Oakland Food Bank',
        phoneNumber: "415-555-FOOD",
        email: 'oaklandFoodBank@sfFoodBank.org'
      },
      websiteUrl: 'www.oaklandFoodBank.org',
      additional: {
        aboutUs: 'Screw SF Food Bank. Hook us up.'
      },
      connections: [],
      foodData: {},
    });
    oaklandFoodBank.save();
  });

  hashPassword('sausalitoFoodBank', function(hashPassword) {
    var sausalitoFoodBank = new User({
      username: 'sausalitoFoodBank',
      password: hashPassword,
      type: 'fbk',
      contactInfo: {
        name: 'Sausalito Food Bank',
        phoneNumber: "415-555-FOOD",
        email: 'sausalitoFoodBank@sfFoodBank.org'
      },
      websiteUrl: 'www.sausalitoFoodBank.org',
      additional: {
        aboutUs: 'Fine foods only.'
      },
      connections: [],
      foodData: {},
    });
    sausalitoFoodBank.save();
  });
};


module.exports = createTestUsers;
