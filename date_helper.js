'use strict';
var _ = require('lodash');
var rp = require('request-promise');
let moment = require('moment');
// moment().format(); // not sure if this is needed

function DateHelper() {

	// TODO: need to add a units parameter to the function
	DateHelper.prototype.getDaysFromDate = function(futureDate) {

		var currentDate = moment().format("YYYY MM DD");
		var daysFromDate = futureDate.diff(currentDate, 'days');
		console.log('daysFromDate = ' + daysFromDate);
		// return values
		// positive number = days until
		// negative number = days since
		return daysFromDate;
	};
}

module.exports = DateHelper;