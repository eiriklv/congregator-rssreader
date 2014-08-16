exports = module.exports = [
    {
        active: false,
        origin: 'feed',
        name: 'gamereactor 20 siste nyheter',
        url: 'http://www.gamereactor.no/rss/rss.php?texttype=4',
        category: ['technology', 'gaming'],
        linkref: 'url',
        format: 'desktop',
        body: true,
        template: {
            elements: [
                {
                    name: 'guid',
                    type: 'url',
                    required: true,
                    items: [
                        {
                            selector: 'guid'
                        }
                    ]
                },
                {
                    name: 'url',
                    type: 'url',
                    required: true,
                    items: [
                        {
                            selector: 'link'
                        }
                    ]
                },
                {
                    name: 'title',
                    required: true,
                    items: [
                        {
                            selector: 'title'
                        }
                    ]
                },
                {
                    name: 'image',
                    type: 'url',
                    items: [
                        {
                            selector: 'description',
                            scrape: {
                                selector: 'img',
                                attribute: 'src'
                            }
                        }
                    ]
                }
            ]
        }
    },
    {
        active: false,
        origin: 'feed',
        name: 'spill.no',
        url: 'http://www.spill.no/feed.aspx?list=news',
        linkref: 'url',
        category: ['technology, gaming'],
        format: 'desktop',
        body: true,
        template: {
            elements: [
                {
                    name: 'guid',
                    type: 'url',
                    required: true,
                    items: [
                        {
                            selector: 'guid'
                        }
                    ]
                },
                {
                    name: 'url',
                    type: 'url',
                    required: true,
                    items: [
                        {
                            selector: 'link'
                        }
                    ]
                },
                {
                    name: 'title',
                    required: true,
                    items: [
                        {
                            selector: 'title'
                        }
                    ]
                },
                {
                    name: 'image',
                    type: 'url',
                    items: [
                        {
                            selector: 'rss:image.#'
                        }
                    ]
                }
            ]
        }
    },
    {
        active: false,
        origin: 'feed',
        name: 'gamer.no',
        url: 'http://www.gamer.no/feeds/general.xml',
        linkref: 'url',
        category: ['technology, gaming'],
        format: 'desktop',
        body: true,
        template: {
            elements: [
                {
                    name: 'guid',
                    type: 'url',
                    required: true,
                    items: [
                        {
                            selector: 'guid'
                        },
                        {
                            selector: 'link'
                        },
                        {
                            selector: 'title',
                            decode: true
                        }
                    ]
                },
                {
                    name: 'title',

                    required: true,
                    items: [
                        {
                            selector: 'title',
                            decode: true
                        }
                    ]
                },
                {
                    name: 'url',
                    type: 'url',
                    required: true,
                    items: [
                        {
                            selector: 'link'
                        }
                    ]
                },
                {
                    name: 'image',
                    type: 'url',
                    items: [
                        {
                            selector: 'enclosures[0].url'
                        }
                    ],
                    fallback: 'http://static.tek.no/images/main/gamer-white.png'
                }
            ]
        }
    },
    {
        active: true,
        origin: 'feed',
        name: 'hackernews',
        url: 'https://news.ycombinator.com/rss',
        linkref: 'url',
        category: ['technology', 'hackernews'],
        format: 'desktop',
        body: true,
        template: {
            elements: [
                {
                    name: 'guid',
                    type: 'url',
                    required: true,
                    items: [
                        {
                            selector: 'guid'
                        },
                        {
                            selector: 'link'
                        },
                        {
                            selector: 'title',
                            decode: true
                        }
                    ]
                },
                {
                    name: 'title',
                    required: true,
                    items: [
                        {
                            selector: 'title'
                        }
                    ]
                },
                {
                    name: 'url',
                    type: 'url',
                    required: true,
                    items: [
                        {
                            selector: 'link'
                        }
                    ]
                },
                {
                    name: 'image',
                    type: 'url',
                    items: [
                        {
                            selector: 'enclosures[0].url'
                        }
                    ],
                    fallback: 'https://news.ycombinator.com/y18.gif'
                }
            ]
        }
    }
];