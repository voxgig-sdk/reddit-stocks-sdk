
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'RedditStocks',
        slug: "reddit-stocks",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
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

  }


  options = {
    base: "https://tradestie.com/api/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        stock: {
        },
  
        stock_detail: {
        },
  
        trend: {
        },
  
    }
  }


  entity = {
    "stock": {
      "fields": [
        {
          "name": "no_of_comments",
          "short": "Number of comments mentioning this stock",
          "type": "`$INTEGER`"
        },
        {
          "name": "sentiment",
          "short": "Overall sentiment for the stock",
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "sentiment_score",
          "short": "Sentiment score ranging from -1 (most bearish) to 1 (most bullish)",
          "type": "`$NUMBER`"
        },
        {
          "name": "ticker",
          "short": "Stock ticker symbol",
          "type": "`$STRING`"
        }
      ],
      "name": "stock",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
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
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "apps",
                "reddit"
              ]
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
          "short": "Number of times mentioned",
          "type": "`$INTEGER`"
        },
        {
          "name": "no_of_comments",
          "short": "Total number of comments",
          "type": "`$INTEGER`"
        },
        {
          "name": "rank",
          "short": "Current rank among discussed stocks",
          "type": "`$INTEGER`"
        },
        {
          "name": "sentiment",
          "short": "Overall sentiment",
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "sentiment_score",
          "short": "Sentiment score",
          "type": "`$NUMBER`"
        },
        {
          "name": "ticker",
          "short": "Stock ticker symbol",
          "type": "`$STRING`"
        }
      ],
      "name": "stock_detail",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": "TSLA",
                    "kind": "param",
                    "name": "ticker",
                    "orig": "ticker",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
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
              "select": {
                "exist": [
                  "ticker"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "apps",
                "reddit",
                "{ticker}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "reddit"
          ]
        ]
      }
    },
    "trend": {
      "fields": [
        {
          "name": "no_of_comments",
          "short": "Number of comments mentioning this stock",
          "type": "`$INTEGER`"
        },
        {
          "name": "sentiment",
          "short": "Overall sentiment for the stock",
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "sentiment_score",
          "short": "Sentiment score",
          "type": "`$NUMBER`"
        },
        {
          "name": "ticker",
          "short": "Stock ticker symbol",
          "type": "`$STRING`"
        },
        {
          "format": "float",
          "name": "trend_score",
          "short": "Trending momentum score",
          "type": "`$NUMBER`"
        }
      ],
      "name": "trend",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {},
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
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "apps",
                "reddit",
                "trend"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

