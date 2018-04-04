'use strict';

// Accept an RSS feed record, and return an object with parsed date and time items.
function parseDepartureTime(entry) {
	var datetime = entry.title.replace(' -', '');
	var parts = entry.title.split(' - ');
	var timeonly = parts[1];

	return {
		date: new Date(datetime),
		datetime: datetime,
		timeonly: timeonly
	};
}
exports.parseDepartureTime = parseDepartureTime;


// Build an array of ferry departure times, with each entry containing an object from parseDepartureTime.
var ferryTimes = [];
function addFerryTime(item) {
	var obj = parseDepartureTime(item);
	ferryTimes.push(obj);
}
exports.addFerryTime = addFerryTime;


// Get the specified departure time, and determine whether or not it's in the future.
var currentTime = new Date();
function isFuture(ndx) {
	var departureTime = ferryTimes[ndx].date;
	return (Date.parse(departureTime) > Date.parse(currentTime))
}
exports.isFuture = isFuture;


// Parse the ferry schedule feed.
function parseFerryFeed(feed) {
	var nextDepartureNdx;

	feed.items.forEach((item, itemNdx) => {
		addFerryTime(item);
		if (nextDepartureNdx === undefined && isFuture(itemNdx)) {
			nextDepartureNdx = itemNdx;
		}
	});
	return nextDepartureNdx;
}
exports.parseFerryFeed = parseFerryFeed;


function getTimeByNdx(ndx) {
	var ft = ferryTimes[ndx] ? ferryTimes[ndx].timeonly : '';
	return ft;
}
exports.getTimeByNdx = getTimeByNdx;
