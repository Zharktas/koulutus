const mongoose = require('mongoose');
mongoose.Promise = Promise;

// Käytetään MongoDB-tietokantaa
mongoose.connect('mongodb://dev:dev@localhost/kanta');

// Määritellään Vastaus-schema
var vastausSchema = mongoose.Schema({
    nimi: String,
    supersankari: String
});

// Määritellään Vastaus-malli
var Vastaus = mongoose.model('Vastaus', vastausSchema);

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

var User = mongoose.model("User", userSchema);

// "Exportoidaan" Vastaus-malli jotta sitä voidaan käyttää muualla
exports.Vastaus = Vastaus;
exports.User = User;
