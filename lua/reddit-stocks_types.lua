-- Typed models for the RedditStocks SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Stock
---@field no_of_comment? number
---@field sentiment? string
---@field sentiment_score? number
---@field ticker? string

---@class StockListMatch
---@field no_of_comment? number
---@field sentiment? string
---@field sentiment_score? number
---@field ticker? string

---@class StockDetail
---@field mention? number
---@field no_of_comment? number
---@field rank? number
---@field sentiment? string
---@field sentiment_score? number
---@field ticker? string

---@class StockDetailLoadMatch
---@field ticker string

---@class Trend
---@field no_of_comment? number
---@field sentiment? string
---@field sentiment_score? number
---@field ticker? string
---@field trend_score? number

---@class TrendListMatch
---@field no_of_comment? number
---@field sentiment? string
---@field sentiment_score? number
---@field ticker? string
---@field trend_score? number

local M = {}

return M
