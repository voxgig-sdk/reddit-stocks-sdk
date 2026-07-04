// Typed models for the RedditStocks SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Stock {
  no_of_comment?: number
  sentiment?: string
  sentiment_score?: number
  ticker?: string
}

export type StockListMatch = Partial<Stock>

export interface StockDetail {
  mention?: number
  no_of_comment?: number
  rank?: number
  sentiment?: string
  sentiment_score?: number
  ticker?: string
}

export interface StockDetailLoadMatch {
  ticker: string
}

export interface Trend {
  no_of_comment?: number
  sentiment?: string
  sentiment_score?: number
  ticker?: string
  trend_score?: number
}

export type TrendListMatch = Partial<Trend>

