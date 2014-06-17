var async = require('async');
var debug = require('debug')('rssreader:distribution');
var colors = require('colors');

exports = module.exports = function () {
    return function (feed, entries, callback) {
        debug('realtime distribution for: '.cyan + feed.name);

        var distributed = 0;

        // async flow control
        async.series({
            distributeEntries: function (callback) {
                async.each(entries, function (entry, callback) {
                    if (entry && this.ipc) {
                        debug('sending realtime update via event emitter');
                        this.ipc.emit('newpost', entry);
                        distributed++;
                    }
                    callback();
                }.bind(this), function (err) {
                    callback(err);
                });
            }.bind(this),
            printData: function (callback) {
                debug(feed.name.cyan + '(distribution)'.blue + ' - '.grey + ' distributed: '.yellow + distributed.toString().green);
                callback();
            }.bind(this)
        }, function (err, results) {
            callback(err, entries);
        });
    };
};
