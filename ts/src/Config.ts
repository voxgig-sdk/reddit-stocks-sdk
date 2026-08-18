
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


  main = {
    name: 'RedditStocks',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$INTEGER`"
        },
        {
          "name": "sentiment",
          "type": "`$STRING`"
        },
        {
          "name": "sentiment_score",
          "type": "`$NUMBER`"
        },
        {
          "name": "ticker",
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
          "type": "`$INTEGER`"
        },
        {
          "name": "no_of_comments",
          "type": "`$INTEGER`"
        },
        {
          "name": "rank",
          "type": "`$INTEGER`"
        },
        {
          "name": "sentiment",
          "type": "`$STRING`"
        },
        {
          "name": "sentiment_score",
          "type": "`$NUMBER`"
        },
        {
          "name": "ticker",
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
          "type": "`$INTEGER`"
        },
        {
          "name": "sentiment",
          "type": "`$STRING`"
        },
        {
          "name": "sentiment_score",
          "type": "`$NUMBER`"
        },
        {
          "name": "ticker",
          "type": "`$STRING`"
        },
        {
          "name": "trend_score",
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

