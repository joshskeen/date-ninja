'use strict';
var _ = require('lodash');
var rp = require('request-promise');
let moment = require('moment');
// moment().format(); // not sure if this is needed

// Date constants
// Might use to handle returns further down the line
var minutes = 1000 * 60;
var hours 	= minutes * 60;
var days 	= hours * 24;
var weeks 	= days * 7;

function DateHelper() {

	DateHelper.prototype.getDaysFromNow = function(futureDate) {

		var currentDate = moment().format("YYYY MM DD");
		var daysFromNow = futureDate.diff(currentDate, 'days');
		console.log('daysFromNow = ' + daysFromNow);
		// TODO: handle return values w/ logic in response handler
		// positive number = days until
		// negative number = days since
		// FIXME absolute value doesn't work = days between two dates
		return daysFromNow;
	};

	DateHelper.prototype.getDaysBetweenDates = function(date1, date2) {

		var daysBetweenDates = date1.diff(date2, 'days');
		console.log('daysBetweenDates = ' + Math.abs(daysBetweenDates));
		// TODO: handle return values w/ logic in response handler
		// positive number = days until
		// negative number = days since
		// FIXME absolute value doesn't work = days between two dates
		return Math.abs(daysBetweenDates); // Returns an absolute number
	};



}

module.exports = DateHelper;