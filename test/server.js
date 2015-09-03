
var express = require('express');
var app = express();
app.use(express.static('./'));

app.get('/store/annotations', function (req, res) {
  console.log("Hello");
});

app.post('/store/annotations', function(req, res) {
  console.log(req.body);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
