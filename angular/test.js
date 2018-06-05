var express = require('express');
var app = express();
app.get('/', function(req, res) {
  res.send("Hello!");
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
