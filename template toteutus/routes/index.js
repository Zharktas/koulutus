var express = require('express');
var router = express.Router();

// kaikissa poluissa paitsi loginissa ja registerissä käytetään ensureLoggedIn middlewarea
// joka pakottaa sisäänkirjautumaan
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/supersankari', function(req, res){

  var nimi = req.body.nimi;
  var supersankari = req.body.supersankari;

  res.render('index', {nimi: req.body.nimi, supersankari: req.body.supersankari})

})


module.exports = router;
