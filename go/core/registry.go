package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewStockEntityFunc func(client *RedditStocksSDK, entopts map[string]any) RedditStocksEntity

var NewStockDetailEntityFunc func(client *RedditStocksSDK, entopts map[string]any) RedditStocksEntity

var NewTrendEntityFunc func(client *RedditStocksSDK, entopts map[string]any) RedditStocksEntity

