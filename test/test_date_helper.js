'use strict';
var chai = require('chai');
var expect = chai.expect;
var DateHelper = require('../date_helper');
chai.config.includeStack = true; // true enables stack trace

describe('DateHelper', function() {
  var subject = new DateHelper();
  var futureDate;
  describe('#daysUntil', function() {
  	context('with a valid date', function() {
  		it('returns the correct date in the future', function() {
  			futureDate = new Date('April 21, 2016'); // I want to test for tomorrow
  			var value = subject.daysUntil(futureDate).then(function(obj) {
  				return obj;
  			});
  			return expect(value).to.eq(1);
  		});
  	});
  });
});