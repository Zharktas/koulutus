var express = require('express');
var router = express.Router();

// ladataan passport jotta sitä voidaan käyttää tässä tiedostossa
var passport = require('passport')

// ladataan tietokanta mallit
var Vastaus = require('../models/model.js').Vastaus;
var User = require('../models/model.js').User;

// ladataan uudelleen ohjauksiin kirjasto
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;



// kaikissa poluissa paitsi loginissa ja registerissä käytetään ensureLoggedIn middlewarea
// joka pakottaa sisäänkirjautumaan
router.get('/', ensureLoggedIn('/login'), function(req, res, next) {
  res.render('index');
});

router.post('/supersankari', ensureLoggedIn('/login'), function(req, res){

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

router.get("/vastaukset", ensureLoggedIn('/login'), function(req, res) {
    Vastaus.find(function (err, vastaukset) {
    if (err) return console.error(err);
    console.log(vastaukset);
    res.render('vastaukset', {vastaukset: vastaukset});
  });
});


// renderöidään register.ejs
router.get('/register', function(req, res){
  res.render('register');
})

router.post('/register', function(req, res){

  var username = req.body.username;
  var password = req.body.password;

  User.create({
      username: username,
      password: password
    }).then(function() {
      res.render('login')
    },
    function() {
      res.status(500).send("Tietokantavirhe");
    });
})

// renderöidään login.ejs
router.get('/login', function(req, res){
  res.render('login');
})

// Autentikoidutaan passportin avulla jonka konfiguraatio on määritetty app.js:ssä
router.post('/login', passport.authenticate('local',
         {successReturnToOrRedirect: '/',
          failureRedirect: '/login'}))


module.exports = router;
