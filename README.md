Congregator RSS-feed Reader
====================================================

#### Introduction:
This is an attempt to make a rss-feed parser that can parse the html content of an rss-entry as well as the entries themselves. It will give you an output of formatted JSON-articles which can be processed at will. It also has the ability to visit the article links and fetch a processed version of the content (done by [node-read](http://github.com/bndr/node-read/)). Now go and build your own [feedly](http://feedly.com/)! :)

#### Built with:
* [node.js](http://www.nodejs.org/)
* [cheerio](http://github.com/cheeriojs/cheerio/)
* [node-read](http://github.com/bndr/node-read/)
* [feedparser](http://github.com/danmactough/node-feedparser/)

#### Example use:
```js
var debug = require('debug')('rssreader:testapp');
var util = require('util');
var events = require('events');
var ipc = new events.EventEmitter();

function isActive (element) {
    return element.active;
}

var handleEntry = function (item, callback) {
    debug(util.inspect(item, { colors: true }));
    callback(null, item);
};

var getFeeds = function (options, callback) {
    var feeds = require('./template');
    callback(null, feeds.filter(isActive));
};

var RssReader = require('congregator-rssreader');

var rssReader = new RssReader({
    getSources: getFeeds,
    handleEntry: handleEntry,
    ipc: ipc,
    sockets: 15,
    waitTime: 10000,
    timeOut: 5000
});

console.log('running rss-reader');

rssReader.run();
```

#### Example template (see the `/example` folder for more elaborate templates):
```json
{
    "active": true,
    "origin": "feed",
    "name": "hackernews",
    "url": "https://news.ycombinator.com/rss",
    "linkref": "url",
    "category": ['technology', 'hackernews'],
    "format": "desktop",
    "body": true,
    "template": {
        "elements": [
            {
                "name": "guid",
                "type": "url",
                "required": true,
                "items": [
                    {
                        "selector": "guid"
                    },
                    {
                        "selector": "link"
                    },
                    {
                        "selector": "title",
                        "decode": true
                    }
                ]
            },
            {
                "name": "title",
                "required": true,
                "items": [
                    {
                        "selector": "title"
                    }
                ]
            },
            {
                "name": "url",
                "type": "url",
                "required": true,
                "items": [
                    {
                        "selector": "link"
                    }
                ]
            },
            {
                "name": "image",
                "type": "url",
                "items": [
                    {
                        "selector": "enclosures[0].url"
                    }
                ],
                "fallback": "https://news.ycombinator.com/y18.gif"
            }
        ]
    }
}
```

#### Example output:
```js
[
    {
        "origin": "feed",
        "source": "https://news.ycombinator.com/",
        "host": "news.ycombinator.com",
        "ranking": 24,
        "category": ['technology', 'hackernews'],
        "guid": "http://blog.ycombinator.com/last-day-to-apply-to-yc-hacks",
        "title": "Last day to apply to YC Hacks",
        "url": "http://blog.ycombinator.com/last-day-to-apply-to-yc-hacks",
        "image": "https://news.ycombinator.com/y18.gif",
        "content": {
            "title": "Last day to apply to YC Hacks",
            "body": "<div class=\"post-body\" id=\"post_body_708360\"> <p>It's the last day to apply to Y Combinator's first hackathon, <a href=\"https://ycombinatorevents.wufoo.com/forms/yc-hacks-application/\">YC Hacks</a>. </p><p>The hackathon will be hosted at YC's office in Mountain View, CA on August 2-3. Our goal is to give smart hackers an excuse to get together and spend time building something they find interesting. We don't have a theme—we want to leave it open to any good ideas.<br></p><p>Kickoff will be at noon on Saturday, August 2. YC companies that develop platforms, services and developer tools, will be around to act as mentors. Judging will happen the evening of August 3. YC alumni are donating prizes, and the top teams will get guaranteed YC interviews for the next batch.</p><div>You can apply individually or as a team. Please have each team member fill out an application.</div><div><br></div><div>Apply <a href=\"https://ycombinatorevents.wufoo.com/forms/yc-hacks-application/\">here</a> by 11:59pm PST tonight. Invitations will be sent by July 7.<br> </div><div><br></div> </div>",
            "image": "https://phaven-prod.s3.amazonaws.com/files/profile_pic/asset/1095067/z1Mvfb6GiEa405SoRjHKSEd4hFw/large_logo2000.png"
        }
    },
    ....
]
```

#### TODO
* description of the templating system
* better description of how to use the module
* full test suite