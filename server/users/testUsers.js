var mongoose = require('mongoose');

var chipotle = new User({
  username: chipotle,
  password: chipotle,
  type: rst,
  contactInfo: {
    name: 'Chipotle',
    phoneNumber: "415-555-TACO",
    email: 'chipotle@chipotle.com'
  }
  websiteUrl: 'www.chipotle.com',
  additional: {
    aboutUs: 'We make yummy burritos.'
  }
  connections: [],
  foodData: {},
})
chipotle.save();

var mehfils = new User({
  username: mehfils,
  password: mehfils,
  type: rst,
  contactInfo: {
    name: 'Mehfils',
    phoneNumber: "415-555-LAMB",
    email: 'mehfils@mehfils.com'
  }
  websiteUrl: 'www.mehfils.com',
  additional: {
    aboutUs: 'Have you tried our goat?'
  }
  connections: [],
  foodData: {},
})
mehfils.save();

var steffs = new User({
  username: steffs,
  password: steffs,
  type: rst,
  contactInfo: {
    name: 'Steffs Bar',
    phoneNumber: "415-555-BEER",
    email: 'steffs@steffs.com'
  }
  websiteUrl: 'www.steffs.com',
  additional: {
    aboutUs: 'We have hot dogs. Mostly beer though.'
  }
  connections: [],
  foodData: {},
})
steffs.save();

var sfFoodBank = new User({
  username: sfFoodBank,
  password: sfFoodBank,
  type: fbk,
  contactInfo: {
    name: 'SF Food Bank',
    phoneNumber: "415-555-BANK",
    email: 'sfFoodBank@sfFoodBank.org'
  }
  websiteUrl: 'www.sfFoodBank.org',
  additional: {
    aboutUs: 'We need some food yo.'
  }
  connections: [],
  foodData: {},
})
sfFoodBank.save();

var oaklandFoodBank = new User({
  username: oaklandFoodBank,
  password: oaklandFoodBank,
  type: fbk,
  contactInfo: {
    name: 'Oakland Food Bank',
    phoneNumber: "415-555-FOOD",
    email: 'oaklandFoodBank@sfFoodBank.org'
  }
  websiteUrl: 'www.oaklandFoodBank.org',
  additional: {
    aboutUs: 'Screw SF Food Bank. Hook us up.'
  }
  connections: [],
  foodData: {},
})
oaklandFoodBank.save();

var sausalitoFoodBank = new User({
  username: sausalitoFoodBank,
  password: sausalitoFoodBank,
  type: fbk,
  contactInfo: {
    name: 'Sausalito Food Bank',
    phoneNumber: "415-555-FOOD",
    email: 'sausalitoFoodBank@sfFoodBank.org'
  }
  websiteUrl: 'www.sausalitoFoodBank.org',
  additional: {
    aboutUs: 'Fine foods only.'
  }
  connections: [],
  foodData: {},
})
sausalitoFoodBank();
