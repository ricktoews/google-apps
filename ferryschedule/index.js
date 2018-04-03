'use strict';

let Parser = require('rss-parser');
let parser = new Parser();

var rssUrl = 'http://www.wsdot.wa.gov/Ferries/Schedule/RSSFeeds/RemainingSailingsToday.aspx?departingterm=7&arrivingterm=3&onlyremainingtime=true';
var dt = new Date();

(async () => {
 
  let feed = await parser.parseURL(rssUrl);
  console.log(feed.title);
  let nextDepartureNdx;
  let itemNdx = 0;

  while (nextDepartureNdx === undefined && itemNdx < 50) {
    let item = feed.items[itemNdx];
    if (item) {
      let departure = item.title.replace(' -', '');
      let departureTime = new Date(departure);
      if (Date.parse(departureTime) > Date.parse(dt)) {
          nextDepartureNdx = itemNdx;
      }
    }
    itemNdx++;
  }
  
  console.log('Next departure:', feed.items[nextDepartureNdx].title);
 
})();
