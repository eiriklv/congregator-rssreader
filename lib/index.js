var request = require('request');
var FeedParser = require('feedparser');
var util = require('util');
var async = require('async');
var http = require('http');

exports = module.exports = function (options) {

    function RssReader (options) {
        this.waitTime = options.waitTime || 10000;
        
        var agent = new http.Agent(); // http agent
        agent.maxSockets = options.sockets || 5;

        this.agent = agent;
    }

    RssReader.prototype.content = require('./content')();
    RssReader.prototype.handler = require('./handler')();
    RssReader.prototype.distribute = require('./distribute')(options.ipc);
    RssReader.prototype.process = require('./process')(options.handleEntry);
    RssReader.prototype.fetch = require('./fetch')(request, FeedParser);
    RssReader.prototype.run = require('./run')(options.getSources);

    return new RssReader(options);
};
