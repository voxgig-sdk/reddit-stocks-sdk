# RedditStocks SDK configuration

module RedditStocksConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "RedditStocks",
        "slug" => "reddit-stocks",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://tradestie.com/api/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "stock" => {},
          "stock_detail" => {},
          "trend" => {},
        },
      },
      "entity" => {
        "stock" => {
          "fields" => [
            {
              "name" => "no_of_comments",
              "short" => "Number of comments mentioning this stock",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "sentiment",
              "short" => "Overall sentiment for the stock",
              "type" => "`$STRING`",
            },
            {
              "name" => "sentiment_score",
              "short" => "Sentiment score ranging from -1 (most bearish) to 1 (most bullish)",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "ticker",
              "short" => "Stock ticker symbol",
              "type" => "`$STRING`",
            },
          ],
          "name" => "stock",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/apps/reddit",
                  "parts" => [
                    "apps",
                    "reddit",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "stock_detail" => {
          "fields" => [
            {
              "name" => "mentions",
              "short" => "Number of times mentioned",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "no_of_comments",
              "short" => "Total number of comments",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "rank",
              "short" => "Current rank among discussed stocks",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "sentiment",
              "short" => "Overall sentiment",
              "type" => "`$STRING`",
            },
            {
              "name" => "sentiment_score",
              "short" => "Sentiment score",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "ticker",
              "short" => "Stock ticker symbol",
              "type" => "`$STRING`",
            },
          ],
          "name" => "stock_detail",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "TSLA",
                        "kind" => "param",
                        "name" => "ticker",
                        "orig" => "ticker",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/apps/reddit/{ticker}",
                  "parts" => [
                    "apps",
                    "reddit",
                    "{ticker}",
                  ],
                  "select" => {
                    "exist" => [
                      "ticker",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "reddit",
              ],
            ],
          },
        },
        "trend" => {
          "fields" => [
            {
              "name" => "no_of_comments",
              "short" => "Number of comments mentioning this stock",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "sentiment",
              "short" => "Overall sentiment for the stock",
              "type" => "`$STRING`",
            },
            {
              "name" => "sentiment_score",
              "short" => "Sentiment score",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "ticker",
              "short" => "Stock ticker symbol",
              "type" => "`$STRING`",
            },
            {
              "name" => "trend_score",
              "short" => "Trending momentum score",
              "type" => "`$NUMBER`",
            },
          ],
          "name" => "trend",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/apps/reddit/trend",
                  "parts" => [
                    "apps",
                    "reddit",
                    "trend",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    RedditStocksFeatures.make_feature(name)
  end
end
