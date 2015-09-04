angular.module('myApp.signup', [])

.controller('SignupCtrl', ['$routeParams', 'AjaxService' function($routeParams, AjaxService){
  /*
  angular best practice is to save the controller "this" context as "vm"
  doing this allows to bind something to our view while nested inside a controller function
  */
  var vm = this;

  /*
  typeParam will be either "rst" or "fbk" based on our .config setup in app.js
  we must make sure <a> href in signup.html directs us to either #/signup/rst or #/signup/fbk
  */
  var typeParam = $routeParams.type;

  //data submited from the html signup form will go in this object
  var postData = {};

  /*
  calling init invokes "postSignupData" method in AjaxService, passing in form data and param type
  */

  init(postData, typeParam);


  function init(data, param){
    AjaxService.postSignupData(data, param)
      .success(function(data, status){
        console.log('signup success', status);

        //if the post request is successful, evaluate this code
        //usually we bind something to our view (via vm) in this situation


      }).error(function(data, status, headers, config){
        console.log('signup error', status);

        //if the post request fails, evaluate this code
      });
  }


}])
