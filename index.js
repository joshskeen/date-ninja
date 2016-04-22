'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
// var app = new Alexa.app('airportinfo'); // ORIGINAL
var app = new Alexa.app('date-ninja');
// var DateHelper = require('./faa_data_helper'); // ORIGINAL
var DateHelper = require('./date_helper');

var utterancesMethod = app.utterances;
app.utterances = function() {
  return utterancesMethod().replace(/\{\-\|/g, '{');
};

app.launch(function(req, res) {
	var prompt = 'I can help you with day, week, and month calculations. Ask me a question.';
	res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('getDaysFromNow', {
  'slots': {
		'INPUTDATE' : 'AMAZON.DATE'
  },
	'utterances': ['{|number of|how many} {days} {until|from|since} {|now|today} {|is|was} {-|INPUTDATE}'] // almost perfect
},
  function(req, res) {
  	console.log('app.intent getDaysFromNow fired');
    //get the slot
    // var airportCode = req.slot('AIRPORTCODE');
    var inputDate = req.slot('INPUTDATE');
    var reprompt = 'Ask me how many days until or from a specified date.';
    if (_.isEmpty(inputDate)) {
    	console.console.log('app.intent daysFromNow blank request');
      var prompt = 'I didn\'t hear the date you want.';
      res.say(prompt).reprompt(reprompt).shouldEndSession(false);
      return true;
    } else {
    	console.log('getDaysFromNow slot is not empty.');
      var dateHelper = new DateHelper();
      dateHelper.getDaysFromNow(inputDate).then(function(daysFromNow) { 
        console.log(daysFromNow);
        res.say(dateHelper.formatDaysFromNowResponse(daysFromNow)).send(); // FIXME
      }).catch(function(err) {
        console.log(err.statusCode);
        var prompt = 'Hmm...I don\'t have a date for that ' + inputDate;
         //https://github.com/matt-kruse/alexa-app/blob/master/index.js#L171
        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      });
      return false;
    }
  }
);
module.exports = app;