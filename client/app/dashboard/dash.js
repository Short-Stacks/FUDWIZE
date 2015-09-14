angular.module('myApp.dashboard', [])

.controller('DashboardCtrl', ['$routeParams','AjaxService', function($routeParams, AjaxService) {
  var vm = this;
  vm.username = $routeParams.username;
  vm.connectionMade = false;
  vm.loadingMap = "loading map...";


  AjaxService.getDashboardData(vm.username)
    .then(function(data) {
      vm.rst = data.rst;
      var foodbankAdd = [data.fbk.contactInfo.streetName + ", "+ data.fbk.contactInfo.cityStateZip];
      vm.fbkAddressLatLong = generateLatLongs(foodbankAdd);

      console.log('data', data);
      // on each vm.rst object element, it contains foodData object
      // under foodData, it contains all foodType, mealType..etc, for example:
      // foodData: { foodType:{canned Goods: true, bakedGoods: false..etc}}
      // if I only used ng-repeat to print out all the info on the html, if will cause some 
      // issues for the filter 
      // therefore, I declare the property under foodData directly under the vm.rst object
      
      for( var i = 0; i < vm.rst.length; i++ ) {
        var rstFoodData = vm.rst[i].foodData;
        var rstContactInfo = vm.rst[i].contactInfo;
        var foodType = objectForloop(rstFoodData.foodType);
        var mealType = objectForloop(rstFoodData.mealType);
        var pickupTime = objectForloop(rstFoodData.pickupTime);
        var pickupDay = objectForloop(rstFoodData.pickupDay);
        vm.address = address(rstContactInfo.name,rstContactInfo.streetName, rstContactInfo.cityStateZip);

        // checking if the foodbank has the rst's connection
        if(data.fbk.connections.indexOf(vm.rst[i].username) > -1){
          vm.rst[i].connectionMade = true;
        }
        else{
          vm.rst[i].connectionMade = false;
        }
        vm.rst[i].foodType = foodType;
        vm.rst[i].mealType = mealType;
        vm.rst[i].pickupTime = pickupTime;
        vm.rst[i].pickupDay = pickupDay;
      }
      vm.restaurantsLatLongs = generateLatLongs(vm.address);
      
      google.maps.event.addDomListener(window, 'load', setTimeout(vm.initMap,1000));
    });
    //making a post request to the server and also turn the connectionMade key to be true
      vm.makeConnection = function(rstUsername, index) {
            // the connection button will appear in green color
        vm.rst[index].connectionMade = true;
        var postData = { rstUsername : rstUsername };
        AjaxService.postNewConnection(vm.username, postData)
          .then(function(data){
            console.log('sucessfully made connection');
          });
      };
//---------------------------------
  vm.rstInfo = []; //[{name: innout, address: 201 maker st}]
  var restaurantsAddresses = [];
  function address(name, street, city) {
    if(street !== undefined || city !== undefined){
      restaurantsAddresses.push(street + ", " + city);
      vm.rstInfo.push(name);
    }
    return restaurantsAddresses;
  }
  function objectForloop(obj) {
    var array = [];
    for( var key in obj ) {
      if( obj[key] ){
        array.push(key);
        array.push(", ");
      }
    }
    array.pop();
    return array.join("");
  }

  var geocoder = new google.maps.Geocoder();
  function generateLatLongs (addressArray){
    var latLongs = [];
    for (var i = 0; i < addressArray.length; i++){
      geocoder.geocode({'address': addressArray[i]}, function (results){
        latLongs.push({lat: results[0].geometry.location.G, lng: results[0].geometry.location.K});

      })
    }
    return latLongs;
  }   
  vm.initMap = function(event, street, cityStateZip, name) {
    var infowindow = null; 
  
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: vm.restaurantsLatLongs[0]
    });

    if(event === undefined){

      for (var i = 0; i< vm.restaurantsLatLongs.length; i++){

        var contentString = '<div id="content">'+ '<strong>Name: </strong>'+ vm.rstInfo[i] +
        '<p><strong>Address: </strong>' + vm.address[i] +
        '</div>'+
        '</div>';


        infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        });

        var marker = new google.maps.Marker({
          position: vm.restaurantsLatLongs[i],
          map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, contentString, infowindow) {
          return function() {
            infowindow.setContent(contentString);
            infowindow.open(map, marker);
          }
        })(marker, contentString, infowindow));
      }
    }
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
        geocoder.geocode({ 'address': address }, function(results, status) {
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
        }
      });
      event.preventDefault();
    }
  }
}]);






