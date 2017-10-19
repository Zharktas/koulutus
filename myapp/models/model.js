var mongoose = require('mongoose');

// Käytetään MongoDB-tietokantaa
mongoose.connect('mongodb://dev:dev@localhost/kanta',
{
  useMongoClient: true,
});

// Määritellään Vastaus-schema
var vastausSchema = mongoose.Schema({
    nimi: String,
  supersankari: String
});

// Määritellään Vastaus-malli
var Vastaus = mongoose.model('Vastaus', vastausSchema);

// "Exportoidaan" Vastaus-malli jotta sitä voidaan käyttää muualla
exports.Vastaus = Vastaus;
