var express = require('express');
var mongoose = require('mongoose');
var app = express();
var path = require('path');
// mongoose.connect('mongob://user:pass@localhost/api');

// app.use(express.static(__dirname + '../client'));
app.use(express.static(path.join(__dirname, '../client')));

var port =  process.env.PORT || 3000; 
var server = app.listen(port, function(){
  var host = server.address().address;
  var p = server.address().port;
  console.log('listening at http://%s:%s', host, p);
});

module.exports = app;