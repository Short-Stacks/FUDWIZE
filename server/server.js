var express = require('express');
var mongoose = require('mongoose');
var app = express();
var path = require('path');
// mongoose.connect('mongob://user:pass@localhost/api');

app.use(express.static(path.join(__dirname, '../client')));

app.post('/signup:type', function(req, res){
	var type = req.params.type;
	// res.json({token: token});
	var data = req.body;
	//send data to db
});
app.post('/login', function(req, res){
	//req.body--> my username and pw
	  //send a reqest to db to get the token
	  //if token is cool, res 201 or 202
	  //else do sth
});
var port =  process.env.PORT || 3000; 
var server = app.listen(port, function(){
  var host = server.address().address;
  var p = server.address().port;
  console.log('listening at http://%s:%s', host, p);
});

module.exports = app;