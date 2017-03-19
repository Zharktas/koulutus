'use strict';

var xml2js = require('xml2js');
var request = require('request');

var FINNPARK_URL = 'http://parkingdata.finnpark.fi:8080/Datex2/OpenData';


// Get list of parkingspaces
exports.index = function(req, res) {
  request.get(FINNPARK_URL,  function(error, response, body) {
    parseFinnparkData(body, function(parsed) {
      if (parsed) {
        res.json(parsed);
      }
      else {
        res.status(500).json({"error": "Could not get data"});
      }
    });
  });
};


/** Parse Finnpark xml data to JS object.

On success, calls callback(parsed_data).
On failure, calls callback(null).
*/
function parseFinnparkData(data, callback) {
  xml2js.parseString(data, function(err, result) {
    if (err) {
      return callback(null);
    }

    var pub = result.d2LogicaModel.payloadPublication[0].genericPublicationExtension[0];

    var spaces = pub.parkingFacilityTablePublication[0].parkingFacilityTable[0].parkingFacility;
    var spacesById = {};
    spaces.forEach(function(space) {
      try {
        spacesById[space.$.id] = parseParkingSpace(space);
      }
      catch (err) {
        console.log(err);
      }
    });

    var statuses = pub.parkingFacilityTableStatusPublication[0].parkingFacilityStatus;
    statuses.forEach(function(status) {
      var id = status.parkingFacilityReference[0].$.id;
      if (id in spacesById) {
        spacesById[id].status = parseStatus(status);
      }
    });

    // Convert object to array of values
    var ret = Object.keys(spacesById).map(function(id) { return spacesById[id]; });
    callback(ret);
  });
}


function parseParkingSpace(rawSpace) {
  var coords = rawSpace.entranceLocation[0].pointByCoordinates[0].pointCoordinates[0];
  return {
    id: rawSpace.$.id,
    name: rawSpace.parkingFacilityName[0],
    coords: {
      latitude: parseFloat(coords.latitude[0]),
      longitude: parseFloat(coords.longitude[0])
    }
  };
}


function parseStatus(rawStatus) {
  var status = {};
  if (rawStatus.parkingFacilityStatus) {
    rawStatus.parkingFacilityStatus.forEach(function(sta) {
      status[sta] = true;
    });
  }
  return status;
}

