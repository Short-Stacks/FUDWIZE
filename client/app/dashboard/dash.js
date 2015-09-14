angular.module('myApp.dashboard', [])

.controller('DashboardCtrl', ['$routeParams','AjaxService', function($routeParams, AjaxService) {
  var vm = this;
  //foodbank's username
  vm.username = $routeParams.username;
  vm.connectionMade = false;
  vm.loadingMap = "loading map...";

  //creating a get request with foodbank data and all restaurant's data
  AjaxService.getDashboardData(vm.username)
    .then(function(data) {
      vm.rst = data.rst; // restaurant data
      var foodbankAdd = [data.fbk.contactInfo.streetName + ", "+ data.fbk.contactInfo.cityStateZip];
      //vm.fbkAddressLatLong = foodbank address longitude and latitude
      vm.fbkAddressLatLong = generateLatLongs(foodbankAdd);

      console.log('data', data);
      
      for( var i = 0; i < vm.rst.length; i++ ) {
        // on each vm.rst object element, it contains foodData object
        // under foodData, it contains all foodType, mealType..etc, for example:
        // foodData: { foodType:{canned Goods: true, bakedGoods: false..etc}}
        // if I only used ng-repeat to print out all the info on the html, it will cause some 
        // issues for the filter 
        // therefore, I declare the property under foodData directly under the vm.rst object
        var rstFoodData = vm.rst[i].foodData;
        var rstContactInfo = vm.rst[i].contactInfo;
        var foodType = objectForloop(rstFoodData.foodType);
        var mealType = objectForloop(rstFoodData.mealType);
        var pickupTime = objectForloop(rstFoodData.pickupTime);
        var pickupDay = objectForloop(rstFoodData.pickupDay);
        // vm.address = restaurant streetName + " " cityStateZip
        vm.address = address(rstContactInfo.name,rstContactInfo.streetName, rstContactInfo.cityStateZip);

        // checking if the foodbank has the rst's connection
        if(data.fbk.connections.indexOf(vm.rst[i].username) > -1){
          // trun the connectionMade to true (turn the button to green)
          vm.rst[i].connectionMade = true;
        }
        else{
          vm.rst[i].connectionMade = false;
        }
        //create new properties below
        vm.rst[i].foodType = foodType;
        vm.rst[i].mealType = mealType;
        vm.rst[i].pickupTime = pickupTime;
        vm.rst[i].pickupDay = pickupDay;
      }
      //vm.restaurantsLatLongs = restaurant address longitude and latitude
      vm.restaurantsLatLongs = generateLatLongs(vm.address);
      
      //loading the google map, using setTimeout for map loading due to aysnc behavior
      // we want all the aysnc data get loaded first before loading the map
      google.maps.event.addDomListener(window, 'load', setTimeout(vm.initMap,1000));
    });
    //making a post request to the server and also turn the connectionMade key to be true
      vm.makeConnection = function(rstUsername, index) {
        // the connection button will appear in green color
        vm.rst[index].connectionMade = true;
        var postData = { rstUsername : rstUsername };
        // post request: connection with foodbank and restaurant
        AjaxService.postNewConnection(vm.username, postData)
          .then(function(data){
            console.log('sucessfully made connection');
          });
      };
//------------Helper Function---------------------
  vm.rstInfo = []; //restaurant name
  var restaurantsAddresses = [];
  //while pushing the restaurant address in an array
  // im also pushing the resturant name into another array
  // it is for setting an infowindow for my google map markers
  function address(name, street, city) {
    if(street !== undefined || city !== undefined) {
      restaurantsAddresses.push(street + ", " + city);
      vm.rstInfo.push(name);
    }
    return restaurantsAddresses;
  }
  //for all the food type data
  function objectForloop(obj) {
    var foodData = [];
    for( var key in obj ) {
      if( obj[key] ){
        foodData.push(key);
        foodData.push(", ");
      }
    }
    foodData.pop();
    return foodData.join(""); //return it as a string at the end
  }
  var geocoder = new google.maps.Geocoder();
  //retrieve array of latitude and longtitude with provided array of addresses
  function generateLatLongs (addressArray) {
    var latLongs = [];
    for (var i = 0; i < addressArray.length; i++){
      geocoder.geocode({'address': addressArray[i]}, function (results){
        latLongs.push({lat: results[0].geometry.location.G, lng: results[0].geometry.location.K});
      })
    }
    return latLongs;
  }   
//----------------------------------------

// execute the google map
  vm.initMap = function(event, street, cityStateZip, name) {
    var infowindow = null; 
  
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: vm.restaurantsLatLongs[0]
    });

// when the map first initialized and instantiated
    if(event === undefined){

      for (var i = 0; i< vm.restaurantsLatLongs.length; i++){

        // map marker infowindow description
        var contentString = '<div id="content">'+ '<strong>Name: </strong>'+ vm.rstInfo[i] +
        '<p><strong>Address: </strong>' + vm.address[i] +
        '</div>'+
        '</div>';

        // pass the contentString to the google map inforwindow
        infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        });

        // defiend map drop pin
        var marker = new google.maps.Marker({
          position: vm.restaurantsLatLongs[i],
          map: map
        });

        // listener to click on markers
        google.maps.event.addListener(marker, 'click', (function(marker, contentString, infowindow) {
          return function() {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
          }
        })(marker, contentString, infowindow));
      }
    }
    // when user clicks on a specific address on dashboard
    else{
        var address = street + " " + cityStateZip;
         var contentString = '<div id="content">'+ '<strong>Name: </strong>'+ name +
        '<p><strong>Address: </strong>' + address +
        '</div>'+
        '</div>';
        infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        });
        //locate the restaurant location on google map
        geocoder.geocode({ 'address': address }, function(results, status) {
          // check if address is valid
          if (status === google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
            google.maps.event.addListener(marker, 'click', (function(marker, contentString, infowindow) {
              return function() {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
              }
            })(marker, contentString, infowindow));
          } 
          else {
            alert('Geocode was not successful for the following reason: ' + status);
            //prevent from refreshing
            event.preventDefault();
          }
      });
      event.preventDefault();
    }
  }
}]);






