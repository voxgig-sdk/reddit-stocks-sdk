# RedditStocks SDK configuration


def make_config():
    return {
        "main": {
            "name": "RedditStocks",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://tradestie.com/api/v1",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "stock": {},
                "stock_detail": {},
                "trend": {},
            },
        },
        "entity": {
      "stock": {
        "fields": [
          {
            "name": "no_of_comment",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "sentiment",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "sentiment_score",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "ticker",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "stock",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/apps/reddit",
                "parts": [
                  "apps",
                  "reddit",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "stock_detail": {
        "fields": [
          {
            "name": "mention",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "no_of_comment",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "rank",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "sentiment",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "sentiment_score",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 4,
          },
          {
            "name": "ticker",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 5,
          },
        ],
        "name": "stock_detail",
        "op": {
          "load": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/apps/reddit/{ticker}",
                "parts": [
                  "apps",
                  "reddit",
                  "{ticker}",
                ],
                "select": {
                  "exist": [
                    "ticker",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "reddit",
            ],
          ],
        },
      },
      "trend": {
        "fields": [
          {
            "name": "no_of_comment",
            "req": False,
            "type": "`$INTEGER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "sentiment",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "sentiment_score",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "ticker",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "trend_score",
            "req": False,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "trend",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/apps/reddit/trend",
                "parts": [
                  "apps",
                  "reddit",
                  "trend",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
