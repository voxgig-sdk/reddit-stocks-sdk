# RedditStocks SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "no_of_comments",
            "type": "`$INTEGER`",
          },
          {
            "name": "sentiment",
            "type": "`$STRING`",
          },
          {
            "name": "sentiment_score",
            "type": "`$NUMBER`",
          },
          {
            "name": "ticker",
            "type": "`$STRING`",
          },
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
                  "reddit",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "stock_detail": {
        "fields": [
          {
            "name": "mentions",
            "type": "`$INTEGER`",
          },
          {
            "name": "no_of_comments",
            "type": "`$INTEGER`",
          },
          {
            "name": "rank",
            "type": "`$INTEGER`",
          },
          {
            "name": "sentiment",
            "type": "`$STRING`",
          },
          {
            "name": "sentiment_score",
            "type": "`$NUMBER`",
          },
          {
            "name": "ticker",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
            "name": "no_of_comments",
            "type": "`$INTEGER`",
          },
          {
            "name": "sentiment",
            "type": "`$STRING`",
          },
          {
            "name": "sentiment_score",
            "type": "`$NUMBER`",
          },
          {
            "name": "ticker",
            "type": "`$STRING`",
          },
          {
            "name": "trend_score",
            "type": "`$NUMBER`",
          },
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
                  "trend",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
