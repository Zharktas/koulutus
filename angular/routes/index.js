var express = require('express');
var router = express.Router();
var Vastaus = require('../model.js').Vastaus;
var User = require('../model.js').User;

var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
var passport = require('passport');

var bcrypt = require('bcrypt');

router.get('/register', function(req, res){
  res.render('register');
});

router.post('/register', function(req, res){
  let username = req.body.username;
  let password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    User.create({
      username: username,
      password: hash
    }).then(() => res.render('kirjautumissivu'));
  });


});

router.get('/login', function(req,res) {
  res.render('kirjautumissivu');
});

router.post('/login', passport.authenticate('local',
         {successReturnToOrRedirect: '/',
          failureRedirect: '/login'}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/supersankari', function(req, res, next){
  let annettunimi = req.body.nimi;
  let supersankari = req.body.supersankari;

  Vastaus.create({
      nimi: annettunimi,
      supersankari: supersankari
    }).then(function() {
      res.send(annettunimi + " " + supersankari);
    },
    function() {
      res.status(500).send("Tietokantavirhe");
    });

  //res.send("moi!" + nimi + " supersankarisi on " + supersankari);
  //res.render('index', {nimi: nimi, supersankari: supersankari})
});

router.get("/vastaukset", function(req, res) {
    Vastaus.find(function (err, vastaukset) {
    if (err) return console.error(err);
    console.log(vastaukset);
    res.render('vastaukset', {vastaukset: vastaukset});
  });
});

router.get("/tulokset", function (req, res) {
  Vastaus.aggregate([{
    $group: { _id: "$supersankari", arvo: {$sum: 1}}}]).then(function(data) {
      var tulokset = {};
      data.forEach(function(v) {
        tulokset[v._id] = v.arvo;
      });
      res.json(tulokset);
    },
    function () {
      res.status(500).send("Tietokantavirhe");
    });
});


module.exports = router;
