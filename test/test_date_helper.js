'use strict';
var chai = require('chai');
var expect = chai.expect;
var DateHelper = require('../date_helper');
chai.config.includeStack = true; // true enables stack trace
var moment = require('moment');
moment().format('YYYY MM DD');

// Constants to handle date calculations

describe('DateHelper', function() {

	// getDaysFromNow method
	var subject = new DateHelper();
	var futureDate; // for testing with getDaysFromNow function
	var pastDate; 	// for testing with getDaysFromNow function
	var date1;		// for testing daysBetweenDates
	var date2;		// for testing daysBetweenDates

	context('With a valid date, getDaysFromNow', function() {
		it('should return 2', function() {
			futureDate = moment('2016 04 21', 'YYYY MM DD'); // I want to test for tomorrow
			expect(subject.getDaysFromNow(futureDate)).to.eq(2);
		});
	});

	context('With an invalid date, getDaysFromNow', function() {
		it('Should return an error', function() {
			futureDate = moment('90322 999 323', 'YYYY MM DD'); // I want to test for a silly value
			expect(subject.getDaysFromNow(futureDate)).to.be.NaN;
		});
	});

	context('With a valid date in the past, getDaysFromNow', function() {
		it('should return -18', function() {
			pastDate = moment('2016 04 01', 'YYYY MM DD'); // I want to test for tomorrow
			expect(subject.getDaysFromNow(pastDate)).to.eq(-18);
		});
	});

	context('With two valid dates, daysBetweenDates', function() {
		it('should return 29', function() {
			date1 = moment('2016 04 01', 'YYYY MM DD'); // I want to test for tomorrow
			date2 = moment('2016 04 30', 'YYYY MM DD'); // I want to test for tomorrow
			expect(subject.getDaysBetweenDates(date1, date2)).to.eq(29);
		});
	});

	context('With a valid date value, getDayOfTheWeekFromDate', function() {
		it('should return Tuesday', function() {
			expect(subject.getDayOfTheWeekFromDate(new Date())).to.eq('Tuesday');
		});
	});
});


















