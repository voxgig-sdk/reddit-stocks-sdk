package = "voxgig-sdk-reddit-stocks"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/reddit-stocks-sdk.git"
}
description = {
  summary = "RedditStocks SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["reddit-stocks_sdk"] = "reddit-stocks_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
