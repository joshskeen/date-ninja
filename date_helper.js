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
		return daysFromNow;
	};

	DateHelper.prototype.getDaysBetweenDates = function(date1, date2) {

		var daysBetweenDates = date1.diff(date2, 'days');
		console.log('daysBetweenDates = ' + Math.abs(daysBetweenDates));
		return Math.abs(daysBetweenDates); // Returns an absolute number
	};

	// DateHelper.prototype.getDayOfTheWeekFromDate = function(inputDate) {

	// 	inputDate = new Date();
	// 	var dayOfTheWeek = inputDate.getDay();

	// 	switch(dayOfTheWeek) {
	// 		case 0: return "Sunday";
	// 		case 1: return "Monday";
	// 		case 2: return "Tuesday";
	// 		case 3: return "Wednesday";
	// 		case 4: return "Thursday";
	// 		case 5: return "Friday";
	// 		case 6: return "Saturday";
	// 		default: return;
	// 	}
	// };

	DateHelper.prototype.getDayOfTheWeekFromDate = function(inputDate) {

		if (inputDate instanceof Date) {
			inputDate = new Date();
			var dayOfTheWeek = inputDate.getDay();

			switch(dayOfTheWeek) {
				case 0: return "Sunday";
				case 1: return "Monday";
				case 2: return "Tuesday";
				case 3: return "Wednesday";
				case 4: return "Thursday";
				case 5: return "Friday";
				case 6: return "Saturday";
				default: return;
			}
		} else {
			// I'm shooting for doing nothing if the input isn't a Date()
			// How would I test this?
			return;
		}

	};

}

module.exports = DateHelper;