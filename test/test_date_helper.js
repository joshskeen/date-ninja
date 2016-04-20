'use strict';
var chai = require('chai');
var expect = chai.expect;
var DateHelper = require('../date_helper');
chai.config.includeStack = true; // true enables stack trace
var moment = require('moment');
moment().format('YYYY MM DD');

describe('DateHelper', function() {

	// getDaysUntil method
	var subject = new DateHelper();
	var futureDate;
	context('With a valid date', function() {
		it('Should return 2', function() {
			futureDate = moment('2016 04 21', 'YYYY MM DD'); // I want to test for tomorrow
			expect(subject.getDaysUntil(futureDate)).to.eq(2);
		});
	});

	context('With an invalid date', function() {
		it('Should return an error', function() {
			futureDate = moment('90322 999 323', 'YYYY MM DD'); // I want to test for a silly value
			expect(subject.getDaysUntil(futureDate)).to.be.NaN;
		});
	});
});


















