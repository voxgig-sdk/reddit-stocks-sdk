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
            ["short"] = "Number of comments mentioning this stock",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "sentiment",
            ["short"] = "Overall sentiment for the stock",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "float",
            ["name"] = "sentiment_score",
            ["short"] = "Sentiment score ranging from -1 (most bearish) to 1 (most bullish)",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "ticker",
            ["short"] = "Stock ticker symbol",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "stock",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
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
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "apps",
                  "reddit",
                },
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
            ["short"] = "Number of times mentioned",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "no_of_comments",
            ["short"] = "Total number of comments",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "rank",
            ["short"] = "Current rank among discussed stocks",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "sentiment",
            ["short"] = "Overall sentiment",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "float",
            ["name"] = "sentiment_score",
            ["short"] = "Sentiment score",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "ticker",
            ["short"] = "Stock ticker symbol",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "stock_detail",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = "TSLA",
                      ["kind"] = "param",
                      ["name"] = "ticker",
                      ["orig"] = "ticker",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
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
                ["select"] = {
                  ["exist"] = {
                    "ticker",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "apps",
                  "reddit",
                  "{ticker}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "reddit",
            },
          },
        },
      },
      ["trend"] = {
        ["fields"] = {
          {
            ["name"] = "no_of_comments",
            ["short"] = "Number of comments mentioning this stock",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "sentiment",
            ["short"] = "Overall sentiment for the stock",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "float",
            ["name"] = "sentiment_score",
            ["short"] = "Sentiment score",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "ticker",
            ["short"] = "Stock ticker symbol",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "float",
            ["name"] = "trend_score",
            ["short"] = "Trending momentum score",
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "trend",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {},
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
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "apps",
                  "reddit",
                  "trend",
                },
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
