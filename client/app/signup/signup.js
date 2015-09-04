angular.module('myApp.signup', [])

.controller('SignupCtrl', ['$routeParams', 'AjaxService' function($routeParams, AjaxService){
  /*
  angular best practice is to save the controller "this" context as "vm" (short for viewmodel)
  doing this allows us to bind something to our view while nested inside a controller function like submitForm
  */
  var vm = this;

  /*
  typeParam will be either "rst" or "fbk" based on our .config setup in app.js
  we must make sure <a> "href=" in signup.html directs us to either #/signup/rst or #/signup/fbk
  */
  var typeParam = $routeParams.type;

  //data submited from the html signup form will go in this object
  var postData = {};

  /*
  calling submitForm invokes "postSignupData(postData, typeParam)" method in AjaxService, passing in form data and param type
  */


  function submitForm(data, param){
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

  /*
  This is the corresponding express pseudo code that matches this POST request

  app.post('/signup/:type', function (req, res) {
    var type = req.params.type;
    var data = req.data;

    save data to  mongoDB async with type="type"

    reference angular shortly to figure out how to send token back
    res.json({token: token});
  });


  */


}])
