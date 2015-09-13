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

  User.remove({username: 'mehfil'}, function(err) {
    if (err) {
      console.log("Unable to delete mehfil");
    } 
    else {
      console.log("mehfil removed");
    }
  });

  User.remove({username: 'tacoshop'}, function(err) {
    if (err) {
      console.log("Unable to delete tacoshop");
    } 
    else {
      console.log("tacoshop removed");
    }
  });

  User.remove({username: 'sffbk'}, function(err) {
    if (err) {
      console.log("Unable to delete sffbk");
    } 
    else {
      console.log("sffbk removed");
    }
  });

  User.remove({username: 'alamedafbk'}, function(err) {
    if (err) {
      console.log("Unable to delete alamedafbk");
    } 
    else {
      console.log("alamedafbk removed");
    }
  });

  User.remove({username: 'napafbk'}, function(err) {
    if (err) {
      console.log("Unable to delete napafbk");
    } 
    else {
      console.log("napafbk removed");
    }
  });

  hashPassword('chipotle', function(hashPassword) {
    var chipotle = new User({
      username: 'chipotle',
      password: hashPassword,
      type: 'rst',
      contactInfo: {
        name: 'Chipotle Mexican Grill',
        phoneNumber: '6505442950',
        email: 'chipotle@chipotle.com',
        streetName: '251 E 3rd Ave',
        cityStreetZip: 'San Mateo, CA 94402'
      },
      websiteUrl: 'www.chipotle.com',
      additional: {
        aboutUs: "When Chipotle opened its first restaurant in 1993, the idea was simple: show that food served fast didn't have to be a “fast-food” experience. Using high-quality raw ingredients, classic cooking techniques, and distinctive interior design, we brought features from the realm of fine dining to the world of quick-service restaurants."
      },
      connections: [],
      foodData: {

        mealType : {
          'Breakfast': false,
          'Lunch': false,
          'Dinner': true,
          'Dessert': false,
        },

        foodType : {
          'Baked Goods': true,
          'Produce': true,
          'Canned Goods': true,
          'Meats': true,
          'Dairy': false,
        },

        pickupDay : {
          'Monday': false,
          'Tuesday': true,
          'Wednesday': false,
          'Thursday': true,
          'Friday': false,
          'Saturday': true,
          'Sunday': false,
        },

        pickupTime : {
          'Early Morning (6AM-9AM)': false,
          'Late Morning (9AM-12PM)': true,
          'Early Afternoon (12PM-3PM)': false,
          'Late Afternoon (3PM-6PM)': true,
          'Evening (6PM-9PM)': false,
        }

      },
    });
    chipotle.save();
  });

  hashPassword('mehfil', function(hashPassword) {
    var mehfil = new User({
      username: 'mehfil',
      password: hashPassword,
      type: 'rst',
      contactInfo: {
        name: 'Mehfils Indian Cuisine',
        phoneNumber: '4158969000',
        email: 'info@mehfilindiancuisine.us',
        streetName: '28 2nd Street',
        cityStreetZip: 'San Francisco, CA 94105'
      },
      websiteUrl: 'www.mehfilindiancuisine.us',
      additional: {
        aboutUs: "Mehfil Indian Restaurants offer the authentic flavors of Indian home cooking in two warmly adorned locations. Mehfil is an Indian Urdu word which means the gathering of family members, relatives, friends & colleagues sharing good moments, good food and having great fun. Mehfil is widely praised as one of one of San Francisco's top Indian dining destinations, just steps from San Franciscos' Financial District. 2011 brought another milestone for Mehfil with its' second Restaurant with Full Bar that opened in Pacific Heights."
      },
      connections: [],
      foodData: {

        mealType : {
          'Breakfast': false,
          'Lunch': false,
          'Dinner': true,
          'Dessert': true,
        },

        foodType : {
          'Baked Goods': false,
          'Produce': false,
          'Canned Goods': false,
          'Meats': true,
          'Dairy': true,
        },

        pickupDay : {
          'Monday': false,
          'Tuesday': false,
          'Wednesday': true,
          'Thursday': false,
          'Friday': false,
          'Saturday': true,
          'Sunday': false,
        },

        pickupTime : {
          'Early Morning (6AM-9AM)': false,
          'Late Morning (9AM-12PM)': false,
          'Early Afternoon (12PM-3PM)': false,
          'Late Afternoon (3PM-6PM)': false,
          'Evening (6PM-9PM)': true,
        }

      }
    });
    mehfil.save();
  });

  hashPassword('tacoshop', function(hashPassword) {
    var tacoshop = new User({
      username: 'tacoshop',
      password: hashPassword,
      type: 'rst',
      contactInfo: {
        name: 'The Taco Shop at Underdogs',
        phoneNumber: '4155668700',
        email: 'www.tacoshopsf.com',
        streetName: '1824 Irving Street',
        cityStreetZip: 'San Francisco, CA 94122'
      },
      websiteUrl: 'www.tacoshopsf.com',
      additional: {
        aboutUs: 'Our goal is to provide local, fresh and sustainable food to the best of our abilities. We care about you, our food and the future of our world.'
      },
      connections: [],
      foodData: {

        mealType : {
          'Breakfast': false,
          'Lunch': false,
          'Dinner': true,
          'Dessert': true,
        },

        foodType : {
          'Baked Goods': true,
          'Produce': false,
          'Canned Goods': false,
          'Meats': true,
          'Dairy': false,
        },

        pickupDay : {
          'Monday': false,
          'Tuesday': false,
          'Wednesday': true,
          'Thursday': false,
          'Friday': false,
          'Saturday': true,
          'Sunday': false,
        },

        pickupTime : {
          'Early Morning (6AM-9AM)': true,
          'Late Morning (9AM-12PM)': false,
          'Early Afternoon (12PM-3PM)': false,
          'Late Afternoon (3PM-6PM)': false,
          'Evening (6PM-9PM)': true,
        }

      },
    });
    tacoshop.save();
  });

  hashPassword('sffbk', function(hashPassword) {
    var sfFoodBank = new User({
      username: 'sffbk',
      password: hashPassword,
      type: 'fbk',
      contactInfo: {
        name: 'SF Marin Food Bank',
        phoneNumber: '4152821900',
        email: 'sfFoodBank@sfFoodBank.org',
        streetName: '900 Pennsylvania Avenue',
        cityStreetZip: 'San Francisco, CA 94107',
        serviceArea: 'San Francisco and Marin County'
      },
      websiteUrl: 'www.sfFoodBank.org',
      additional: {
        aboutUs: "The Food Bank is a lifeline. Every day we distribute enough food for 107,000 meals — that's more than 46 million pounds this year. It takes a comprehensive approach and a network of 450 partners to make it happen.",
        mission: "To end hunger in San Francisco and Marin."
      },
      connections: [],
      foodData: {},
    });
    sfFoodBank.save();
  });

  hashPassword('alamedafbk', function(hashPassword) {
    var alamedaCountyFoodBank = new User({
      username: 'alamedafbk',
      password: hashPassword,
      type: 'fbk',
      contactInfo: {
        name: 'Alameda County Community Food Bank',
        phoneNumber: '5106353663',
        email: 'info@accfb.org',
        streetName: '7900 Edgewater Drive',
        cityStreetZip: 'Oakland, CA 94621'
      },
      websiteUrl: 'www.accfb.org',
      additional: {
        aboutUs: "Alameda County Community Food Bank has been in business since 1985 ... with a vision toward a day when we can go out of business. We are the hub of a vast collection and distribution network that provides food for 240 nonprofit agencies in Alameda County. In 2014, the Food Bank distributed 25 million meals -- more than half of the food was fresh fruits and vegetables. Since moving into our permanent facility near the Oakland Airport in 2005 and leading the national food bank movement for a ban on the distribution of carbonated beverages, the Food Bank has ramped up distribution of fresh fruits and vegetables by more than 1,000%.",
        mission: "Alameda County Community Food Bank passionately pursues a hunger-free community"
      },
      connections: [],
      foodData: {},
    });
    alamedaCountyFoodBank.save();
  });

  hashPassword('napafbk', function(hashPassword) {
    var communityActionNapaValley = new User({
      username: 'napafbk',
      password: hashPassword,
      type: 'fbk',
      contactInfo: {
        name: 'Community Action Napa Valley',
        phoneNumber: '7072536100',
        email: 'canv@can-v.org',
        streetName: '2310 Laurel Street #1',
        cityStreetZip: 'Napa, CA 94559'
      },
      websiteUrl: 'www.canv.org',
      additional: {
        aboutUs: 'Community Action stays true to its mission by continuing provide basic needs – food and shelter – along with other programs to support people as they become self-sufficient members of our vibrant community. We believe in partnership and are founding members of the Coalition of Non-Profit Organizations. We are active with many local initiatives and work groups including the Continuum of Care; Live Healthy Napa Valley; Area Agency on Aging; the Workforce Investment Board, and more to improve the quality of life for people throughout the Napa Valley.',
        mission: "At Community Action of Napa Valley we believe that no one in our community should live in poverty. Every day we offer local people emergency assistance along with tools and skills to rebuild their lives and fully participate in this amazing community."
      },
      connections: [],
      foodData: {},
    });
    communityActionNapaValley.save();
  });
};


module.exports = createTestUsers;
