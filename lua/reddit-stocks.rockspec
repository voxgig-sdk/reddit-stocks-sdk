package = "voxgig-sdk-reddit-stocks"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/reddit-stocks-sdk.git",
  tag = "lua/v0.0.1",
  dir = "reddit-stocks-sdk/lua"
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
