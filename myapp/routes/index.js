var express = require('express');
var router = express.Router();

var Vastaus = require('../models/model.js').Vastaus;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/supersankari', function(req, res){

  var nimi = req.body.nimi;
  var supersankari = req.body.supersankari;

  Vastaus.create({
      nimi: nimi,
      supersankari: supersankari
    }).then(function() {
      res.render('index', {nimi: req.body.nimi, supersankari: req.body.supersankari})
    },
    function() {
      res.status(500).send("Tietokantavirhe");
    });


})

router.get("/vastaukset", function(req, res) {
    Vastaus.find(function (err, vastaukset) {
    if (err) return console.error(err);
    console.log(vastaukset);
    res.render('vastaukset', {vastaukset: vastaukset});
  });
});


module.exports = router;
