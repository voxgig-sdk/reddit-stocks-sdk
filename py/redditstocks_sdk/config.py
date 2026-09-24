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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "title": "No Of Comments",
            "type": "`$INTEGER`",
            "short": "Number of comments mentioning this stock",
          },
          {
            "name": "sentiment",
            "title": "Sentiment",
            "type": "`$STRING`",
            "short": "Overall sentiment for the stock",
          },
          {
            "name": "sentiment_score",
            "title": "Sentiment Score",
            "type": "`$NUMBER`",
            "short": "Sentiment score ranging from -1 (most bearish) to 1 (most bullish)",
            "format": "float",
          },
          {
            "name": "ticker",
            "title": "Ticker",
            "type": "`$STRING`",
            "short": "Stock ticker symbol",
          },
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
                    "lit": "apps",
                  },
                  {
                    "lit": "reddit",
                  },
                ],
                "parts": [
                  "apps",
                  "reddit",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
            "title": "Mentions",
            "type": "`$INTEGER`",
            "short": "Number of times mentioned",
          },
          {
            "name": "no_of_comments",
            "title": "No Of Comments",
            "type": "`$INTEGER`",
            "short": "Total number of comments",
          },
          {
            "name": "rank",
            "title": "Rank",
            "type": "`$INTEGER`",
            "short": "Current rank among discussed stocks",
          },
          {
            "name": "sentiment",
            "title": "Sentiment",
            "type": "`$STRING`",
            "short": "Overall sentiment",
          },
          {
            "name": "sentiment_score",
            "title": "Sentiment Score",
            "type": "`$NUMBER`",
            "short": "Sentiment score",
            "format": "float",
          },
          {
            "name": "ticker",
            "title": "Ticker",
            "type": "`$STRING`",
            "short": "Stock ticker symbol",
          },
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
                    "lit": "apps",
                  },
                  {
                    "lit": "reddit",
                  },
                  {
                    "var": "ticker",
                  },
                ],
                "parts": [
                  "apps",
                  "reddit",
                  "{ticker}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "ticker",
                      "orig": "ticker",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "TSLA",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "ticker",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "trend": {
        "fields": [
          {
            "name": "no_of_comments",
            "title": "No Of Comments",
            "type": "`$INTEGER`",
            "short": "Number of comments mentioning this stock",
          },
          {
            "name": "sentiment",
            "title": "Sentiment",
            "type": "`$STRING`",
            "short": "Overall sentiment for the stock",
          },
          {
            "name": "sentiment_score",
            "title": "Sentiment Score",
            "type": "`$NUMBER`",
            "short": "Sentiment score",
            "format": "float",
          },
          {
            "name": "ticker",
            "title": "Ticker",
            "type": "`$STRING`",
            "short": "Stock ticker symbol",
          },
          {
            "name": "trend_score",
            "title": "Trend Score",
            "type": "`$NUMBER`",
            "short": "Trending momentum score",
            "format": "float",
          },
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
                    "lit": "apps",
                  },
                  {
                    "lit": "reddit",
                  },
                  {
                    "lit": "trend",
                  },
                ],
                "parts": [
                  "apps",
                  "reddit",
                  "trend",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
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
