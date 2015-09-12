angular.module('myApp.dashboard', [])

.controller('DashboardCtrl', ['$routeParams', 'AjaxService', function($routeParams, AjaxService) {
  var vm = this;
  vm.username = $routeParams.username;
  AjaxService.getDashboardData(vm.username)
    .then(function(data) {
      vm.rst = data.rst;
      var foodbankAdd = [data.fbk.contactInfo.streetName + ", "+ data.fbk.contactInfo.cityStateZip];
      vm.fbkAddressLatLong = generateLatLongs(foodbankAdd);
      console.log('foodbank',  vm.fbkAddressLatLong);
      console.log('vm.rst', vm.rst);
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

        vm.rst[i].foodType = foodType;
        vm.rst[i].mealType = mealType;
        vm.rst[i].pickupTime = pickupTime;
        vm.rst[i].pickupDay = pickupDay;
      }
      vm.restaurantsLatLongs = generateLatLongs(vm.address);
      console.log('vm.restaurantsLatLongs', vm.restaurantsLatLongs);  
      google.maps.event.addDomListener(window, 'load', initMap);
    });
//---------------------------------
  vm.rstInfo = []; //[{name: innout, address: 201 maker st}]
  var restaurantsAddresses = [];
  var address = function(name, street, city) {
    if(street !== undefined || city !== undefined){
      restaurantsAddresses.push(street + ", " + city);
      vm.rstInfo.push(name);
    }
    return restaurantsAddresses;
  }
  var objectForloop = function(obj) {
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

  function generateLatLongs (addressArray){
    var latLongs = [];
    for (var i = 0; i < addressArray.length; i++){
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': addressArray[i]}, function (results){
        latLongs.push({lat: results[0].geometry.location.G, lng: results[0].geometry.location.K});
        console.log(latLongs);
      })
    }

    console.log('addressArray', addressArray);
    console.log('latlong', latLongs)
    return latLongs;
  }

// var restaurantsLatLongs = generateLatLongs(restaurantsAddresses);      
  function initMap() {

    var infowindow = null; 
  
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: vm.restaurantsLatLongs[0]
    });

    for (var i = 0; i< vm.restaurantsLatLongs.length; i++){

      var contentString = '<div id="content">'+ '<strong>Name: </strong>'+ vm.rstInfo[i] +
      '<p><strong>Address: </strong>' + vm.address[i] +
      '</div>'+
      '</div>';

      console.log('vm.address[i] is ', vm.address[i]);


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
}]);







