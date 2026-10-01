export interface StockDetail {
    mentions?: number;
    no_of_comments?: number;
    rank?: number;
    sentiment?: string;
    sentiment_score?: number;
    ticker?: string;
}
export interface StockDetailLoadMatch {
    ticker: string;
}
export interface StockDetailListMatch {
    mentions?: number;
    no_of_comments?: number;
    rank?: number;
    sentiment?: string;
    sentiment_score?: number;
    ticker?: string;
}
export interface Trend {
    no_of_comments?: number;
    sentiment?: string;
    sentiment_score?: number;
    ticker?: string;
    trend_score?: number;
}
export interface TrendListMatch {
    no_of_comments?: number;
    sentiment?: string;
    sentiment_score?: number;
    ticker?: string;
    trend_score?: number;
}
