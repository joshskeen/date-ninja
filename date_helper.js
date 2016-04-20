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

	/*
	Sample utterances:
	'How many days until <inputDate>?' (returns positive number)
	'How many days from now is <inputDate>?' (returns positive number)
	'How many days have passed since <inputDate>?' (returns negative number)
	'How many days since <inputDate>?' (returns negative number)
	'How many days ago was <inputDate>?' (returns negative number)
	*/

	DateHelper.prototype.getDaysFromNow = function(inputDate) {

		var currentDate = moment().format("YYYY MM DD");
		var daysFromNow = inputDate.diff(currentDate, 'days');
		console.log('daysFromNow = ' + daysFromNow);
		// TODO: handle return values w/ logic in response handler
		// positive number = days until
		// negative number = days since
		return daysFromNow;
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

	DateHelper.prototype.getDaysInTheFuture = function(daysInTheFuture) {
		if (typeof Number(daysInTheFuture)) {
			console.log('getDaysInTheFuture ' + moment().add(daysInTheFuture, 'days').calendar());
			return moment().add(daysInTheFuture, 'days').calendar();
		}
		return;
	};

	/*
	Sample utterances:
	What was the date <daysInThePast> days ago?
	*/

	DateHelper.prototype.getDaysInThePast = function(daysInThePast) {
		if (typeof Number(daysInThePast)) {
			console.log('getDaysInThePast ' + moment().subtract(daysInThePast, 'days').calendar());
			return moment().subtract(daysInThePast, 'days').calendar();
		}
		return;
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





}

module.exports = DateHelper;