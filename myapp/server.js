var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  // body-parser:n ansiosta HTTP-pyynnön parametrit
  // ovat muuttujassa req.body
  var nimi = req.body.nimi;
  res.send("Moi " + nimi);
});

app.get('/hello', function(req, res) {
  res.send("Hello World!");
});

var server = app.listen(
    process.env.PORT || 3000,
    process.env.IP || "0.0.0.0",
    function() {
      var addr = server.address();
      console.log("Server listening at",
                  addr.address + ":" + addr.port);
    }
);
