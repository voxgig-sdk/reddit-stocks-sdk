# RedditStocks SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "slug": "reddit-stocks",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Number of comments mentioning this stock",
            "type": "`$INTEGER`",
          },
          {
            "name": "sentiment",
            "short": "Overall sentiment for the stock",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "sentiment_score",
            "short": "Sentiment score ranging from -1 (most bearish) to 1 (most bullish)",
            "type": "`$NUMBER`",
          },
          {
            "name": "ticker",
            "short": "Stock ticker symbol",
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
                "segments": [
                  {
                    "lit": "apps",
                  },
                  {
                    "lit": "reddit",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "apps",
                  "reddit",
                ],
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
            "short": "Number of times mentioned",
            "type": "`$INTEGER`",
          },
          {
            "name": "no_of_comments",
            "short": "Total number of comments",
            "type": "`$INTEGER`",
          },
          {
            "name": "rank",
            "short": "Current rank among discussed stocks",
            "type": "`$INTEGER`",
          },
          {
            "name": "sentiment",
            "short": "Overall sentiment",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "sentiment_score",
            "short": "Sentiment score",
            "type": "`$NUMBER`",
          },
          {
            "name": "ticker",
            "short": "Stock ticker symbol",
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
                "segments": [
                  {
                    "lit": "apps",
                  },
                  {
                    "lit": "reddit",
                  },
                  {
                    "var": "ticker",
                  },
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
                "parts": [
                  "apps",
                  "reddit",
                  "{ticker}",
                ],
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
            "short": "Number of comments mentioning this stock",
            "type": "`$INTEGER`",
          },
          {
            "name": "sentiment",
            "short": "Overall sentiment for the stock",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "sentiment_score",
            "short": "Sentiment score",
            "type": "`$NUMBER`",
          },
          {
            "name": "ticker",
            "short": "Stock ticker symbol",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "trend_score",
            "short": "Trending momentum score",
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
                "segments": [
                  {
                    "lit": "apps",
                  },
                  {
                    "lit": "reddit",
                  },
                  {
                    "lit": "trend",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "apps",
                  "reddit",
                  "trend",
                ],
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
