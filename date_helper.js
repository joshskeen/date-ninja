'use strict';
var _ = require('lodash');
var rp = require('request-promise');

// constants
var minutes = 1000*60;
var hours = minutes*60;
var days = hours*24;


function DateHelper() {

	// TODO: need to add a units parameter to the function
	DateHelper.prototype.daysUntil = function(futureDate) {
		// fill in

		var now = new Date();
		// TODO: need a switch here
		var dateDifference = Math.round((futureDate - now)/days);
		console.log('dateDifference = ' + dateDifference);
		return dateDifference
	}

}

module.exports = DateHelper;