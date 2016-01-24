var express = require('express');
var app = express();
var contacts =  [{
  name:"oscar"
},{
  name:"nestor"
}];

app.get('/contacts', function(req, res) {
  res.status(200).json(contacts);
})
app.listen(8082);
