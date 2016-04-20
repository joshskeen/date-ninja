'use strict';
var _ = require('lodash');
var rp = require('request-promise');
let moment = require('moment');
moment().format(); // not sure if this is needed

/*
TODO: refactor to accept strings.
DONE: created validation function for strings passed in.

All dates from Amazon Alexa get passed in as strings in format YYYY-MM-DD
*/

// Date constants
// Might use to handle returns further down the line, commenting out for now
// var minutes = 1000 * 60;
// var hours 	= minutes * 60;
// var days 	= hours * 24;
// var weeks 	= days * 7;

function DateHelper() {

	/*
	Sample utterances:
	'How many days until <inputDate>?' (returns positive number)
	'How many days from now is <inputDate>?' (returns positive number)
	'How many days have passed since <inputDate>?' (returns negative number)
	'How many days since <inputDate>?' (returns negative number)
	'How many days ago was <inputDate>?' (returns negative number)
	*/

	// Takes AMAZON.DATE string as its argument
	DateHelper.prototype.getDaysFromNow = function(inputDate) {

		if (isValidDate(inputDate)) { 		// validate it
			// if it's valid, run the function
			inputDate = moment(inputDate, "YYYY-MM-DD").startOf('day'); // inputDate starts as a string, recast as a moment here
			// create currentDate moment from current Date()
			var currentDate = moment(new Date()).startOf('day');

			// Calculate daysFromNow here
			var daysFromNow = inputDate.diff(currentDate, 'days');
			console.log("\t" + 'daysFromNow = ' + daysFromNow);

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

	// Takes AMAZON.DATE strings as its arguments
	DateHelper.prototype.getDaysBetweenDates = function(date1, date2) {

		// validate arguments
		if (isValidDate(date1) && isValidDate(date2)) {
			// convert arguments to moments
			date1 = moment(date1, "YYYY-MM-DD").startOf('day');
			date2 = moment(date2, "YYYY-MM-DD").startOf('day');

			// calculate difference between dates in days
			var daysBetweenDates = date1.diff(date2, 'days');
			console.log("\t" + 'daysBetweenDates = ' + Math.abs(daysBetweenDates));

			// return absolute value
			return Math.abs(daysBetweenDates); // Returns an absolute number
		} else {
			// throw an error
			throw new Error("getDaysBetweenDates(): both arguments must be valid AMAZON.DATE strings");
		}
	};


	/*
	Sample utterances for this function:
	'What day of the week was <inputDate>?'
	'What day of the week is <inputDate>?'
	'What day of the week will <inputDate> be?'
	*/

	// Takes AMAZON.DATE string as its argument
	DateHelper.prototype.getDayOfTheWeekFromDate = function(inputDate) {

		if (isValidDate(inputDate)) {
			inputDate = new Date(inputDate);
			console.log("\tinputDate = " + inputDate);

			// TODO: read docs re: how this returns the right date.
			// http://stackoverflow.com/a/24177229/4475605
			var dayOfTheWeek = inputDate.getUTCDay();

			console.log("\tThe day of the week (number) is " + dayOfTheWeek);

			switch(dayOfTheWeek) {
				case 0: return "Sunday";
				case 1: return "Monday";
				case 2: return "Tuesday";
				case 3: return "Wednesday";
				case 4: return "Thursday";
				case 5: return "Friday";
				case 6: return "Saturday";
				default: return; // leaving in as insurance policy
			}
		} else {
			throw new Error("getDayOfTheWeekFromDate(): argument was not a valid AMAZON.DATE string");
		}
	};

	/*
	Sample utterances:
	'What is the date <daysInTheFuture> days from now?'
	'What's <daysInTheFuture> days from now?'
	*/

	// Takes AMAZON.NUMBER as its argument
	DateHelper.prototype.getDaysInTheFuture = function(daysInTheFuture) {
		if (isNaN(daysInTheFuture)) {
			throw new Error("getDaysInTheFuture(): argument must be a number");
		} else {
			console.log('\tgetDaysInTheFuture ' + moment().add(daysInTheFuture, 'days').calendar());
			return moment().add(daysInTheFuture, 'days').calendar();
		}
	};

	/*
	Sample utterances:
	What was the date <daysInThePast> days ago?
	*/

	// Takes AMAZON.NUMBER as its argument
	DateHelper.prototype.getDaysInThePast = function(daysInThePast) {
		// refactored w/ better error handling
		if (isNaN(daysInThePast)) {
			throw new Error("getDaysInThePast(): argument must be a number");
		} else {
			console.log('\tgetDaysInThePast ' + moment().subtract(daysInThePast, 'days').calendar());
			return moment().subtract(daysInThePast, 'days').calendar();
		}
	};

	/*
	Sample utterances:
	What is the date <weeksInTheFuture> weeks from now?
	What's the date <weeksInTheFuture> weeks from now?
	What is the date <weeksInTheFuture> weeks in the future?
	What's the date <weeksInTheFuture> weeks in the future?
	*/

	// Takes AMAZON.NUMBER as its argument
	DateHelper.prototype.getWeeksInTheFuture = function(weeksInTheFuture) {
		if (isNaN(weeksInTheFuture)) {
			throw new Error("getWeeksInTheFuture(): argument must be a number");
		} else {
			// The original attempt
			console.log('\tgetWeeksInTheFuture ' + moment().add(weeksInTheFuture, 'weeks').calendar());
			return moment().add(weeksInTheFuture, 'weeks').calendar();
		}
	};

	/*
	Sample utterances:
	What was the date <weeksInThePast> weeks ago?
	What was the date <weeksInThePast> weeks in the past?
	*/

	// Takes AMAZON.NUMBER as its argument
	DateHelper.prototype.getweeksInThePast = function(weeksInThePast) {
		if (isNaN(weeksInThePast)) {
			throw new Error("getweeksInThePast(): argument must be a number");
		} else {
			// The original attempt
			console.log('\tgetweeksInThePast ' + moment().subtract(weeksInThePast, 'weeks').calendar());
			return moment().subtract(weeksInThePast, 'weeks').calendar();
		}
	};

	/*
	Sample utterances:
	What is the date <monthsInTheFuture> from now?
	What is the date <monthsInTheFuture> from today?
	*/

	// Takes AMAZON.NUMBER as its argument
	DateHelper.prototype.getMonthsInTheFuture = function(monthsInTheFuture) {
		if (isNaN(monthsInTheFuture)) {
			throw new Error("getMonthsInTheFuture(): argument must be a number");
		} else {
			console.log('\tgetMonthsInTheFuture ' + moment().add(monthsInTheFuture, 'months').calendar());
			return moment().add(monthsInTheFuture, 'months').calendar();
		}
	};
	
	// 	Sample utterances:
	// 	What was the date <monthsInThePast> months ago?
	// 	What was the date <monthsInThePast> months ago today?	

	// Takes AMAZON.NUMBER as its argument
	DateHelper.prototype.getMonthsInThePast = function(monthsInThePast) {
		if (typeof Number(monthsInThePast)) {
			console.log('getMonthsInThePast ' + moment().subtract(monthsInThePast, 'months').calendar());
			return moment().subtract(monthsInThePast, 'months').calendar();
		}
		return;
	};

// Validation method for dateStrings passed in as AMAZON.DATE

	function isValidDate(dateString) {
	    // First check for the pattern
	    var regex_date = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

	    if(!regex_date.test(dateString)) {
	    	console.log("\t" + dateString + " IS NOT a valid date");
	        return false;
	    }

	    // Parse the date parts to integers
	    var parts   = dateString.split("-");
	    var day     = parseInt(parts[2], 10);
	    var month   = parseInt(parts[1], 10);
	    var year    = parseInt(parts[0], 10);

	    // Check the ranges of month and year
	    if(year < 1000 || year > 3000 || month === 0 || month > 12) {
	    	console.log("\t" + dateString + " IS NOT a valid date");
	        return false;
	    }

	    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

	    // Adjust for leap years
	    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
	        monthLength[1] = 29;
	    }

	    console.log("\t" + dateString + " IS a valid date");

	    // Check the range of the day
	    return day > 0 && day <= monthLength[month - 1];
	}
}

module.exports = DateHelper;