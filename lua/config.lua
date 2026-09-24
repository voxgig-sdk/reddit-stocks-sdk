-- RedditStocks SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "RedditStocks",
      slug = "reddit-stocks",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://tradestie.com/api/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["stock"] = {},
        ["stock_detail"] = {},
        ["trend"] = {},
      },
    },
    entity = {
      ["stock"] = {
        ["fields"] = {
          {
            ["name"] = "no_of_comments",
            ["title"] = "No Of Comments",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of comments mentioning this stock",
          },
          {
            ["name"] = "sentiment",
            ["title"] = "Sentiment",
            ["type"] = "`$STRING`",
            ["short"] = "Overall sentiment for the stock",
          },
          {
            ["name"] = "sentiment_score",
            ["title"] = "Sentiment Score",
            ["type"] = "`$NUMBER`",
            ["short"] = "Sentiment score ranging from -1 (most bearish) to 1 (most bullish)",
            ["format"] = "float",
          },
          {
            ["name"] = "ticker",
            ["title"] = "Ticker",
            ["type"] = "`$STRING`",
            ["short"] = "Stock ticker symbol",
          },
        },
        ["name"] = "stock",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/apps/reddit",
                ["segments"] = {
                  {
                    ["lit"] = "apps",
                  },
                  {
                    ["lit"] = "reddit",
                  },
                },
                ["parts"] = {
                  "apps",
                  "reddit",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["stock_detail"] = {
        ["fields"] = {
          {
            ["name"] = "mentions",
            ["title"] = "Mentions",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of times mentioned",
          },
          {
            ["name"] = "no_of_comments",
            ["title"] = "No Of Comments",
            ["type"] = "`$INTEGER`",
            ["short"] = "Total number of comments",
          },
          {
            ["name"] = "rank",
            ["title"] = "Rank",
            ["type"] = "`$INTEGER`",
            ["short"] = "Current rank among discussed stocks",
          },
          {
            ["name"] = "sentiment",
            ["title"] = "Sentiment",
            ["type"] = "`$STRING`",
            ["short"] = "Overall sentiment",
          },
          {
            ["name"] = "sentiment_score",
            ["title"] = "Sentiment Score",
            ["type"] = "`$NUMBER`",
            ["short"] = "Sentiment score",
            ["format"] = "float",
          },
          {
            ["name"] = "ticker",
            ["title"] = "Ticker",
            ["type"] = "`$STRING`",
            ["short"] = "Stock ticker symbol",
          },
        },
        ["name"] = "stock_detail",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/apps/reddit/{ticker}",
                ["segments"] = {
                  {
                    ["lit"] = "apps",
                  },
                  {
                    ["lit"] = "reddit",
                  },
                  {
                    ["var"] = "ticker",
                  },
                },
                ["parts"] = {
                  "apps",
                  "reddit",
                  "{ticker}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "ticker",
                      ["orig"] = "ticker",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "TSLA",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "ticker",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["trend"] = {
        ["fields"] = {
          {
            ["name"] = "no_of_comments",
            ["title"] = "No Of Comments",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of comments mentioning this stock",
          },
          {
            ["name"] = "sentiment",
            ["title"] = "Sentiment",
            ["type"] = "`$STRING`",
            ["short"] = "Overall sentiment for the stock",
          },
          {
            ["name"] = "sentiment_score",
            ["title"] = "Sentiment Score",
            ["type"] = "`$NUMBER`",
            ["short"] = "Sentiment score",
            ["format"] = "float",
          },
          {
            ["name"] = "ticker",
            ["title"] = "Ticker",
            ["type"] = "`$STRING`",
            ["short"] = "Stock ticker symbol",
          },
          {
            ["name"] = "trend_score",
            ["title"] = "Trend Score",
            ["type"] = "`$NUMBER`",
            ["short"] = "Trending momentum score",
            ["format"] = "float",
          },
        },
        ["name"] = "trend",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/apps/reddit/trend",
                ["segments"] = {
                  {
                    ["lit"] = "apps",
                  },
                  {
                    ["lit"] = "reddit",
                  },
                  {
                    ["lit"] = "trend",
                  },
                },
                ["parts"] = {
                  "apps",
                  "reddit",
                  "trend",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
