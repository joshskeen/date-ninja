'use strict';
var _ = require('lodash');
var rp = require('request-promise');
let moment = require('moment');
// moment().format(); // not sure if this is needed

/*
TODO: refactor to accept strings.
DONE: created validation function for strings passed in.

All dates from Amazon Alexa get passed in as strings in format YYYY-MM-DD


*/

// Date constants
// Might use to handle returns further down the line
var minutes = 1000 * 60;
var hours 	= minutes * 60;
var days 	= hours * 24;
var weeks 	= days * 7;

function DateHelper() {

	/*
	Sample utterances:
	'How many days until <inputDate>?' (returns positive number)
	'How many days from now is <inputDate>?' (returns positive number)
	'How many days have passed since <inputDate>?' (returns negative number)
	'How many days since <inputDate>?' (returns negative number)
	'How many days ago was <inputDate>?' (returns negative number)
	*/

	// REFACTORED
	DateHelper.prototype.getDaysFromNow = function(inputDate) {

		if (isValidDate(inputDate)) { 		// validate it
			// if it's valid, run the function
			inputDate = moment(inputDate, "YYYY-MM-DD").startOf('day'); // inputDate starts as a string, recast as a moment here
			// create currentDate moment from current Date()
			var currentDate = moment(new Date()).startOf('day');

			// Calculate daysFromNow here
			var daysFromNow = inputDate.diff(currentDate, 'days');
			console.log('daysFromNow = ' + daysFromNow);

			return daysFromNow;
		} else {
			// throw an error
			throw new Error("getDaysFromNow(): argument must be valid AMAZON.DATE string");
		}
	};

	/*
	'How many days are between <date1> and <date2>?'
	'What is the difference in days between <date1> and <date2>?'
	'What's the difference in days between <date1> and <date2>?'
	*/

	DateHelper.prototype.getDaysBetweenDates = function(date1, date2) {

		var daysBetweenDates = date1.diff(date2, 'days');
		console.log('daysBetweenDates = ' + Math.abs(daysBetweenDates));
		return Math.abs(daysBetweenDates); // Returns an absolute number
	};


	/*
	Sample utterances for this function:
	'What day of the week was <inputDate>?'
	'What day of the week is <inputDate>?'
	'What day of the week will <inputDate> be?'
	*/
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

	/*
	Sample utterances:
	'What is the date <daysInTheFuture> days from now?'
	'What's <daysInTheFuture> days from now?'
	*/

	// FIXME: need to refactor error handling

	DateHelper.prototype.getDaysInTheFuture = function(daysInTheFuture) {
		if (isNaN(daysInTheFuture)) {
			throw new Error("getDaysInTheFuture(): argument must be a number");
		} else {
			console.log('getDaysInTheFuture ' + moment().add(daysInTheFuture, 'days').calendar());
			return moment().add(daysInTheFuture, 'days').calendar();
		}
	};

	/*
	Sample utterances:
	What was the date <daysInThePast> days ago?
	*/

	DateHelper.prototype.getDaysInThePast = function(daysInThePast) {
		// refactored w/ better error handling
		if (isNaN(daysInThePast)) {
			throw new Error("getDaysInThePast(): argument must be a number");
		} else {
			console.log('getDaysInThePast ' + moment().subtract(daysInThePast, 'days').calendar());
			return moment().subtract(daysInThePast, 'days').calendar();
		}



	};

	/*
	Sample utterances:
	What is the date <monthsInTheFuture> from now?
	What is the date <monthsInTheFuture> from today?
	What is the date <monthsInTheFuture>?
	*/
	DateHelper.prototype.getMonthsInTheFuture = function(monthsInTheFuture) {
		if (typeof Number(monthsInTheFuture)) {
			console.log('getMonthsInTheFuture ' + moment().add(monthsInTheFuture, 'months').calendar());
			return moment().add(monthsInTheFuture, 'months').calendar();
		} else {
			return undefined;			
		}
	};

/*
	Sample utterances:
	What was the date <monthsInThePast> months from today?
	What was the date <monthsInThePast> months from now?
	What was the date <monthsInThePast> months ago? 
*/
	DateHelper.prototype.getMonthsInThePast = function(monthsInThePast) {
		if (typeof Number(monthsInThePast)) {
			console.log('getMonthsInThePast ' + moment().subtract(monthsInThePast, 'months').calendar());
			return moment().subtract(monthsInThePast, 'months').calendar();
		}
		return;
	};

// Validation method for dateStrings created by AMAZON.DATE

	function isValidDate(dateString) {
	    // First check for the pattern
	    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

	    if(!regex_date.test(dateString)) {
	    	console.log(dateString + " IS NOT a valid date");
	        return false;
	    }

	    // Parse the date parts to integers
	    var parts   = dateString.split("-");
	    var day     = parseInt(parts[2], 10);
	    var month   = parseInt(parts[1], 10);
	    var year    = parseInt(parts[0], 10);

	    // Check the ranges of month and year
	    if(year < 1000 || year > 3000 || month === 0 || month > 12) {
	    	console.log(dateString + " IS NOT a valid date");
	        return false;
	    }

	    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

	    // Adjust for leap years
	    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
	        monthLength[1] = 29;
	    }

	    console.log(dateString + " IS a valid date");

	    // Check the range of the day
	    return day > 0 && day <= monthLength[month - 1];
	}



}

module.exports = DateHelper;