'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
// var app = new Alexa.app('airportinfo'); // ORIGINAL
var app = new Alexa.app('date-ninja');
// var FAADataHelper = require('./faa_data_helper'); // ORIGINAL
var DateHelper = require('./date_helper');


app.launch(function(req, res) {
  // var prompt = 'For delay information, tell me an Airport code.'; // ORIGINAL
  var prompt = 'For date calculations, let me know what you\'d like to do.';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});
module.exports = app;