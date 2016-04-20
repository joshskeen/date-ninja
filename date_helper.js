'use strict';
var _ = require('lodash');
var rp = require('request-promise');
let moment = require('moment');
// moment().format(); // not sure if this is needed

// STOCK TUTORIAL CODE
// function DateHelper() {

// 	DateHelper.prototype.requestDaysUntil = function(futureDate) {
// 		return this.getDaysUntil(futureDate).then(
// 			function(response) {
// 				console.log('success - daysUntil futureDate is ' + response);
// 				return response.body;
// 			}
// 		);
// 	};

// 	// TODO: need to add a units parameter to the function
// 	DateHelper.prototype.getDaysUntil = function(futureDate) {

// 		var currentDate = moment().format("YYYY MM DD");
// 		var daysUntil = futureDate.diff(currentDate, 'days');
// 		console.log('daysUntil = ' + daysUntil);
// 		return daysUntil;
// 	};
// }

function DateHelper() {

	// TODO: need to add a units parameter to the function
	DateHelper.prototype.getDaysUntil = function(futureDate) {

		var currentDate = moment().format("YYYY MM DD");
		var daysUntil = futureDate.diff(currentDate, 'days');
		console.log('daysUntil = ' + daysUntil);
		return daysUntil;
	};
}


module.exports = DateHelper;