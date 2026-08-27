
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

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
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
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
              "parts": [
                "apps",
                "reddit"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "apps",
                "reddit",
                "{ticker}"
              ],
              "select": {
                "exist": [
                  "ticker"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "apps",
                "reddit",
                "trend"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

