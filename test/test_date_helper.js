'use strict';
var chai = require('chai');
var expect = chai.expect;
var DateHelper = require('../date_helper');
chai.config.includeStack = true; // true enables stack trace
var moment = require('moment');
// moment().format('YYYY MM DD');

// Constants to handle date calculations

describe('DateHelper', function() {

	// getDaysFromNow method
	var subject = new DateHelper();
	var futureDate; // for testing with getDaysFromNow function
	var pastDate; 	// for testing with getDaysFromNow function
	var date1;		// for testing daysBetweenDates
	var date2;		// for testing daysBetweenDates

	// PASSED!
	context('With a valid date in moment format, getDaysFromNow', function() {
		it('should return 1', function() {
			// Original code
			// futureDate = moment('2016 04 21', 'YYYY MM DD'); // I want to test for tomorrow
			futureDate = "2016-04-21"; // I want to test for tomorrow
			expect(subject.getDaysFromNow(futureDate)).to.eq(1);
		});
	});

	// PASSED!
	context('With an invalid date in moment format, getDaysFromNow', function() {
		it('Should return an error', function() {
			futureDate = moment('90322 999 323', 'YYYY MM DD'); // I want to test for a silly value
			expect(subject.getDaysFromNow.bind(futureDate)).to.throw('getDaysFromNow(): argument must be valid AMAZON.DATE string');
		});
	});

	// PASSED!
	context('With a valid date in moment format in the past, getDaysFromNow', function() {
		it('should return -19', function() {
			pastDate = "2016-04-01"; // I want to test for tomorrow
			expect(subject.getDaysFromNow(pastDate)).to.eq(-19);
		});
	});

	// PASSED!
	context('With two valid dates in moment format, daysBetweenDates', function() {
		it('should return 29', function() {
			date1 = '2016-04-01'; // I want to test for tomorrow
			date2 = '2016-04-30'; // I want to test for tomorrow
			expect(subject.getDaysBetweenDates(date1, date2)).to.eq(29);
		});
	});

	// PASSED!
	context('With 1 valid, 1 invalid, daysBetweenDates', function() {
		it('should return an error', function() {
			date1 = '2016-04-01'; // valid string
			date2 = 'PT5H10M'; // Invalid string
			expect(subject.getDaysBetweenDates.bind(date1, date2)).to.throw('getDaysBetweenDates(): both arguments must be valid AMAZON.DATE strings');
		});
	});

	// PASSED!
	context('With a valid date value, getDayOfTheWeekFromDate', function() {
		it('should return Tuesday', function() {
			expect(subject.getDayOfTheWeekFromDate("2016-04-19")).to.eq('Tuesday');
		});
	});

	// PASSED!
	context('With a invalid date value, getDayOfTheWeekFromDate', function() {
		it('should return an error', function() {
			expect(subject.getDayOfTheWeekFromDate.bind('bogusArgument')).to.throw('getDayOfTheWeekFromDate(): argument was not a valid AMAZON.DATE string');
		});
	});

	// PASSED!
	context('With a valid number, getDaysInTheFuture', function() {
		it('should return a string', function() {
			expect(subject.getDaysInTheFuture(7)).to.be.valid;
		});
	});

	// PASSED!
	context('With a NaN argument, getDaysInTheFuture', function() {
		it('should throw an error', function() {
			expect(subject.getDaysInTheFuture.bind('bogusArgument')).to.throw('getDaysInTheFuture(): argument must be a number');
		});
	});

	// PASSED!
	context('With a valid number, getDaysInThePast', function() {
		it('should return a string', function() {
			expect(subject.getDaysInThePast(7)).to.be.valid;
		});
	});

	// PASSED!
	context('with a NaN argument, getDaysInThePast', function() {
		it('should throw an error', function() {
			expect(subject.getDaysInThePast.bind('bogusArgument')).to.throw('getDaysInThePast(): argument must be a number');
		});
	});

	// PASSED
	context('with a valid number, weeksInTheFuture', function() {
		it('should return a string', function() {
			expect(subject.getWeeksInTheFuture(7)).to.be.valid;
		});
	});

	// PASSED
	context('with an invalid argument, weeksInTheFuture', function() {
		it('should return an error', function() {
			expect(subject.getWeeksInTheFuture.bind('randomString')).to.throw('getWeeksInTheFuture(): argument must be a number');
		});
	});


	// PASSED
	context('with a valid number, weeksInThePast', function() {
		it('should return a string', function() {
			expect(subject.getweeksInThePast(7)).to.be.valid;
		});
	});

	// PASSED
	context('with an invalid argument, weeksInThePast', function() {
		it('should return an error', function() {
			expect(subject.getweeksInThePast.bind('randomString')).to.throw('getweeksInThePast(): argument must be a number');
		});
	});

	// PASSED
	context('With a valid argument, getMonthsInTheFuture', function() {
		it('should return a string', function() {
			expect(subject.getMonthsInTheFuture(7)).to.be.valid;
		});
	});

	// PASSED
	context('With a NaN argument, getMonthsInTheFuture', function() {
		it('should throw an error', function() {
			expect(subject.getMonthsInTheFuture.bind('string')).to.throw('getMonthsInTheFuture(): argument must be a number');
		});
	});
});















