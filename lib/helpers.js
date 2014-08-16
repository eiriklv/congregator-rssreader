var url = require('url');

exports = module.exports = {
    containsIllegalDomain: function (url) {
        var url = url || '';

        var illegalDomains = [
            'nytimes.com'
        ];

        var result;

        illegalDomains.forEach(function (domain) {
            if (url.toLowerCase().indexOf(domain) != -1) {
                result = domain;
            }
        });

        return result;
    },
    byString: function (o, s) {
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
    },
    fixRelativePath: function (link, source) {
        if (!link) return;

        var pat = /^https?:\/\//i;
        return !pat.test(link) ? url.resolve(source, link) : link;
    },
    getMetaImage: function ($) {
        var meta = $('meta');
        var keys = Object.keys(meta);

        var ogImage;

        keys.forEach(function (key) {
            if (meta[key].attribs && meta[key].attribs.property && meta[key].attribs.property === 'og:image') {
                ogImage = meta[key].attribs.content;
            }
        });

        return ogImage;
    },
    getParams: function (str) {
        var params = str.split(';').reduce(function (params, param) {
            var parts = param.split('=').map(function (part) {
                return part.trim();
            });
            if (parts.length === 2) {
                params[parts[0]] = parts[1];
            }
            return params;
        }, {});
        return params;
    }
};
