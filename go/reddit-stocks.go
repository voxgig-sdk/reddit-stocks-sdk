package voxgigredditstockssdk

import (
	"github.com/voxgig-sdk/reddit-stocks-sdk/go/core"
	"github.com/voxgig-sdk/reddit-stocks-sdk/go/entity"
	"github.com/voxgig-sdk/reddit-stocks-sdk/go/feature"
	_ "github.com/voxgig-sdk/reddit-stocks-sdk/go/utility"
)

// Type aliases preserve external API.
type RedditStocksSDK = core.RedditStocksSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type RedditStocksEntity = core.RedditStocksEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type RedditStocksError = core.RedditStocksError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewStockEntityFunc = func(client *core.RedditStocksSDK, entopts map[string]any) core.RedditStocksEntity {
		return entity.NewStockEntity(client, entopts)
	}
	core.NewStockDetailEntityFunc = func(client *core.RedditStocksSDK, entopts map[string]any) core.RedditStocksEntity {
		return entity.NewStockDetailEntity(client, entopts)
	}
	core.NewTrendEntityFunc = func(client *core.RedditStocksSDK, entopts map[string]any) core.RedditStocksEntity {
		return entity.NewTrendEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewRedditStocksSDK = core.NewRedditStocksSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
