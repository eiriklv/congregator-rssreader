var debug = require('debug')('rssreader:processing');
var colors = require('colors');
var async = require('async');

exports = module.exports = function () {
    return function (feed, posts, callback, operation) {
        debug('processing '.cyan + posts.length + ' posts for feed '.cyan + feed.name.magenta + operation);

        var updateCount = 0; // keep count of how many articles are updated (duplicates)
        var insertCount = 0; // keep count of how many articles are new
        var newEntries = [];

        // async flow control
        async.series({
            processEntries: function(callback){
                async.eachSeries(posts, function (item, callback) {
                    this.handleEntry(item, function (err, newPost) {
                        if (err) return callback(err);

                        var cleanEntry;

                        if(newPost) {
                            cleanEntry = newPost.toObject ? newPost.toObject() : newPost;
                        }

                        if (cleanEntry) {
                            debug('processed new entry with guid: ' + cleanEntry.guid.yellow);
                            newEntries.push(cleanEntry);
                            insertCount++;
                        }
                        else {
                            updateCount++;
                        }
                        callback();
                    }.bind(this));
                }.bind(this), function (err) {
                    callback(err, newEntries);
                });
            }.bind(this),
            printData: function (callback) {
                debug(feed.name.cyan + operation + ' - '.grey + ' updated: ' + updateCount.toString().yellow + ' new: ' + insertCount.toString().magenta);
                callback();
            }.bind(this)
        }, function (err, results) {
            callback(err, results.processEntries);
        });
    };
};
