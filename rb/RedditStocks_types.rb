# frozen_string_literal: true

# Typed models for the RedditStocks SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Stock entity data model.
#
# @!attribute [rw] no_of_comment
#   @return [Integer, nil]
#
# @!attribute [rw] sentiment
#   @return [String, nil]
#
# @!attribute [rw] sentiment_score
#   @return [Float, nil]
#
# @!attribute [rw] ticker
#   @return [String, nil]
Stock = Struct.new(
  :no_of_comment,
  :sentiment,
  :sentiment_score,
  :ticker,
  keyword_init: true
)

# Match filter for Stock#list (any subset of Stock fields).
#
# @!attribute [rw] no_of_comment
#   @return [Integer, nil]
#
# @!attribute [rw] sentiment
#   @return [String, nil]
#
# @!attribute [rw] sentiment_score
#   @return [Float, nil]
#
# @!attribute [rw] ticker
#   @return [String, nil]
StockListMatch = Struct.new(
  :no_of_comment,
  :sentiment,
  :sentiment_score,
  :ticker,
  keyword_init: true
)

# StockDetail entity data model.
#
# @!attribute [rw] mention
#   @return [Integer, nil]
#
# @!attribute [rw] no_of_comment
#   @return [Integer, nil]
#
# @!attribute [rw] rank
#   @return [Integer, nil]
#
# @!attribute [rw] sentiment
#   @return [String, nil]
#
# @!attribute [rw] sentiment_score
#   @return [Float, nil]
#
# @!attribute [rw] ticker
#   @return [String, nil]
StockDetail = Struct.new(
  :mention,
  :no_of_comment,
  :rank,
  :sentiment,
  :sentiment_score,
  :ticker,
  keyword_init: true
)

# Request payload for StockDetail#load.
#
# @!attribute [rw] ticker
#   @return [String]
StockDetailLoadMatch = Struct.new(
  :ticker,
  keyword_init: true
)

# Trend entity data model.
#
# @!attribute [rw] no_of_comment
#   @return [Integer, nil]
#
# @!attribute [rw] sentiment
#   @return [String, nil]
#
# @!attribute [rw] sentiment_score
#   @return [Float, nil]
#
# @!attribute [rw] ticker
#   @return [String, nil]
#
# @!attribute [rw] trend_score
#   @return [Float, nil]
Trend = Struct.new(
  :no_of_comment,
  :sentiment,
  :sentiment_score,
  :ticker,
  :trend_score,
  keyword_init: true
)

# Match filter for Trend#list (any subset of Trend fields).
#
# @!attribute [rw] no_of_comment
#   @return [Integer, nil]
#
# @!attribute [rw] sentiment
#   @return [String, nil]
#
# @!attribute [rw] sentiment_score
#   @return [Float, nil]
#
# @!attribute [rw] ticker
#   @return [String, nil]
#
# @!attribute [rw] trend_score
#   @return [Float, nil]
TrendListMatch = Struct.new(
  :no_of_comment,
  :sentiment,
  :sentiment_score,
  :ticker,
  :trend_score,
  keyword_init: true
)

