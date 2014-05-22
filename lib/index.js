var request = require('request');
var FeedParser = require('feedparser');
var util = require('util');
var async = require('async');
var http = require('http');

function RssReader (options) {
    this.ipc = options.ipc;
    this.handleEntry = options.handleEntry;
    this.getSources = options.getSources;
    this.waitTime = options.waitTime || 10000;
    this.timeOut = options.timeOut || 10000;

    var agent = new http.Agent(); // http agent
    agent.maxSockets = options.sockets || 5;
    this.agent = agent;
}

RssReader.prototype.content = require('./content')();
RssReader.prototype.handler = require('./handler')();
RssReader.prototype.distribute = require('./distribute')();
RssReader.prototype.process = require('./process')();
RssReader.prototype.fetch = require('./fetch')(request, FeedParser);
RssReader.prototype.run = require('./run')();

exports = module.exports = RssReader;