'use strict';
var chai = require('chai');
var expect = chai.expect;
var DateHelper = require('../date_helper');
chai.config.includeStack = true; // true enables stack trace
var moment = require('moment');
moment().format('YYYY MM DD');

describe('DateHelper', function() {

	// getDaysFromDate method
	var subject = new DateHelper();
	var futureDate; // for testing with getDaysFromDate function
	var pastDate; 	// for testing with getDaysFromDate function

	context('With a valid date, getDaysFromDate', function() {
		it('should return 2', function() {
			futureDate = moment('2016 04 21', 'YYYY MM DD'); // I want to test for tomorrow
			expect(subject.getDaysFromDate(futureDate)).to.eq(2);
		});
	});

	context('With an invalid date, getDaysFromDate', function() {
		it('Should return an error', function() {
			futureDate = moment('90322 999 323', 'YYYY MM DD'); // I want to test for a silly value
			expect(subject.getDaysFromDate(futureDate)).to.be.NaN;
		});
	});

	context('With a valid date, getDaysFromDate', function() {
		it('should return -18', function() {
			pastDate = moment('2016 04 01', 'YYYY MM DD'); // I want to test for tomorrow
			expect(subject.getDaysFromDate(pastDate)).to.eq(-18);
		});
	});
});


















