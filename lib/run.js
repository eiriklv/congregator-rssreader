var async = require('async');
var debug = require('debug')('rssreader:run');
var util = require('util');
var colors = require('colors');

exports = module.exports = function () {
    return function (callback) {
        async.parallel({
            getFeeds: function (callback) {
                async.series({
                    getSourcesToProcess: function (callback) {
                        this.getSources({}, function (err, feeds) {
                            if (err) {
                                debug(util.inspect(err));
                                return callback();
                            }

                            this.feeds = feeds;
                            callback();
                        }.bind(this));
                    }.bind(this),
                    processFeeds: function (callback) {
                        async.each(this.feeds, function (feed, callback) {
                            async.waterfall([
                                // fetch feed entries and parse them according to the template
                                function (callback) {
                                    this.fetch(feed, callback);
                                }.bind(this),
                                // process entries
                                function (entries, callback) {
                                    entries ? this.process(feed, entries, callback, '(initial)'.green) : callback();
                                }.bind(this),
                                // distribute new entries via event emitter
                                function (entries, callback) {
                                    entries ? this.distribute(feed, entries, callback) : callback();
                                }.bind(this),
                                // get content for new entries
                                function (entries, callback) {
                                    entries ? this.content(feed, entries, callback) : callback();
                                }.bind(this),
                                // process new entries with content attached
                                function (entries, callback) {
                                    entries ? this.process(feed, entries, callback, '(content)'.green) : callback();
                                }.bind(this)
                            ], function (err, results) {
                                callback(err);
                            });
                        }.bind(this), function (err) {
                            var msg = err ? 'error: '.red + util.inspect(err) : 'all feeds done...'.green;
                            debug(msg);
                            callback();
                        });
                    }.bind(this),
                }, function (err, results) {
                    if (err) debug('error: ' + util.inspect(err));
                    callback();
                });
            }.bind(this),
            wait: function (callback) {
                setTimeout(function () {
                    debug('done waiting');
                    callback();
                }.bind(this), this.waitTime);
            }.bind(this)
        }, function (err, results) {
            var msg = err ? 'error: '.red + util.inspect(err) : '**rss reader - done waiting - commensing new read..............**'.blue;
            debug(msg);
            if (callback) callback();
        });
    };
};
