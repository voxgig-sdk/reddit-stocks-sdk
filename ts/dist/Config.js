"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'RedditStocks',
        slug: "reddit-stocks",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://tradestie.com/api/v1",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            stock: {},
            stock_detail: {},
            trend: {},
        }
    };
    entity = {
        "stock": {
            "fields": [
                {
                    "name": "no_of_comments",
                    "title": "No Of Comments",
                    "type": "`$INTEGER`",
                    "short": "Number of comments mentioning this stock"
                },
                {
                    "name": "sentiment",
                    "title": "Sentiment",
                    "type": "`$STRING`",
                    "short": "Overall sentiment for the stock"
                },
                {
                    "name": "sentiment_score",
                    "title": "Sentiment Score",
                    "type": "`$NUMBER`",
                    "short": "Sentiment score ranging from -1 (most bearish) to 1 (most bullish)",
                    "format": "float"
                },
                {
                    "name": "ticker",
                    "title": "Ticker",
                    "type": "`$STRING`",
                    "short": "Stock ticker symbol"
                }
            ],
            "name": "stock",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/apps/reddit",
                            "segments": [
                                {
                                    "lit": "apps"
                                },
                                {
                                    "lit": "reddit"
                                }
                            ],
                            "parts": [
                                "apps",
                                "reddit"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "stock_detail": {
            "fields": [
                {
                    "name": "mentions",
                    "title": "Mentions",
                    "type": "`$INTEGER`",
                    "short": "Number of times mentioned"
                },
                {
                    "name": "no_of_comments",
                    "title": "No Of Comments",
                    "type": "`$INTEGER`",
                    "short": "Total number of comments"
                },
                {
                    "name": "rank",
                    "title": "Rank",
                    "type": "`$INTEGER`",
                    "short": "Current rank among discussed stocks"
                },
                {
                    "name": "sentiment",
                    "title": "Sentiment",
                    "type": "`$STRING`",
                    "short": "Overall sentiment"
                },
                {
                    "name": "sentiment_score",
                    "title": "Sentiment Score",
                    "type": "`$NUMBER`",
                    "short": "Sentiment score",
                    "format": "float"
                },
                {
                    "name": "ticker",
                    "title": "Ticker",
                    "type": "`$STRING`",
                    "short": "Stock ticker symbol"
                }
            ],
            "name": "stock_detail",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/apps/reddit/{ticker}",
                            "segments": [
                                {
                                    "lit": "apps"
                                },
                                {
                                    "lit": "reddit"
                                },
                                {
                                    "var": "ticker"
                                }
                            ],
                            "parts": [
                                "apps",
                                "reddit",
                                "{ticker}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "ticker",
                                        "orig": "ticker",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "TSLA"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "ticker"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "trend": {
            "fields": [
                {
                    "name": "no_of_comments",
                    "title": "No Of Comments",
                    "type": "`$INTEGER`",
                    "short": "Number of comments mentioning this stock"
                },
                {
                    "name": "sentiment",
                    "title": "Sentiment",
                    "type": "`$STRING`",
                    "short": "Overall sentiment for the stock"
                },
                {
                    "name": "sentiment_score",
                    "title": "Sentiment Score",
                    "type": "`$NUMBER`",
                    "short": "Sentiment score",
                    "format": "float"
                },
                {
                    "name": "ticker",
                    "title": "Ticker",
                    "type": "`$STRING`",
                    "short": "Stock ticker symbol"
                },
                {
                    "name": "trend_score",
                    "title": "Trend Score",
                    "type": "`$NUMBER`",
                    "short": "Trending momentum score",
                    "format": "float"
                }
            ],
            "name": "trend",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/apps/reddit/trend",
                            "segments": [
                                {
                                    "lit": "apps"
                                },
                                {
                                    "lit": "reddit"
                                },
                                {
                                    "lit": "trend"
                                }
                            ],
                            "parts": [
                                "apps",
                                "reddit",
                                "trend"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {}
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map