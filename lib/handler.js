var cheerio = require('cheerio');
var url = require('url');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

// helper to access nested objects with string literals as object key. Example -> Object.byString(someObj, 'part3[0].name');
Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1');  // convert indexes to properties
    s = s.replace(/^\./, ''); // strip leading dot
    var a = s.split('.');
    while (a.length) {
        var n = a.shift();
        if (n in o) {
            o = o[n];
        } else {
            return;
        }
    }
    return o;
};

exports = module.exports = function () {
    return function (post, feed, ranking) {
        var valid = false;

        var entry = {
            origin: feed.origin,
            source: post.meta.link,
            host: url.parse(post.meta.link).host,
            ranking: ranking,
            category: feed.category
        };

        feed.template.elements.forEach(function (element) {
            var holder;

            if (element.required) {
                valid = false;
            }

            element.items.forEach(function (item) {
                var active = false;
                // get the entry element
                if (item.scrape) {
                    var $ = cheerio.load(Object.byString(post, item.selector));
                    holder = $(item.scrape.selector).attr(item.scrape.attribute);
                }
                else if (item.decode) {
                    holder = entities.decode(Object.byString(post, item.selector));
                }
                else {
                    holder = Object.byString(post, item.selector);
                }

                // set item if it has been found
                if (holder && !entry[element.name]) {
                    entry[element.name] = holder;
                    active = true;
                }
            });

            // add fallback if supplied
            if (element.fallback && !entry[element.name]) {
                entry[element.name] = element.fallback;
            }

            if (entry[element.name] && (element.type == 'url')) {
                entry[element.name] = fixRelativePath(entry[element.name], entry.source);
            }

            // check if item is required for entry to be valid, and then check if item is set
            if (element.required && entry[element.name]) {
                valid = true;
            }
        });

        return entry;
    };
};

// helper for completing relative paths
function fixRelativePath (link, source) {
    var pat = /^https?:\/\//i;
    return !pat.test(link) ? url.resolve(source, link) : link;
}
