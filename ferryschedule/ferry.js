'use strict';

// RSS Parser
let Parser = require('rss-parser');
let parser = new Parser();

let ferry = require('./ferry-utils');

// RSS Feed URL
var rssUrl = {
	'SeattleBainbridge': 'http://www.wsdot.wa.gov/Ferries/Schedule/RSSFeeds/RemainingSailingsToday.aspx?departingterm=7&arrivingterm=3&onlyremainingtime=true',
	'BainbridgeSeattle': 'http://www.wsdot.wa.gov/Ferries/Schedule/RSSFeeds/RemainingSailingsToday.aspx?departingterm=3&arrivingterm=7&onlyremainingtime=true'
}

// Template for text payload.
var responseTemplate = 'The next ferry from Seattle to Bainbridge Island leaves at __NEXT__. If you miss it, the one after that leaves at __AFTER__.';


(async () => {
 
	let feed = await parser.parseURL(rssUrl.SeattleBainbridge);
	var title = feed.title;

	var nextDepartureNdx = ferry.parseFerryFeed(feed);
	var next = ferry.getTimeByNdx(nextDepartureNdx);
	var after = ferry.getTimeByNdx(1+nextDepartureNdx);
  
	var responseText = responseTemplate.replace('__NEXT__', next);
	responseText = responseText.replace('__AFTER__', after);
	console.log(title + '. ' + responseText);
 
})();
