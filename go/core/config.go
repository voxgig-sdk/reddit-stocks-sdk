package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "RedditStocks",
			"slug": "reddit-stocks",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://tradestie.com/api/v1",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"stock": map[string]any{},
				"stock_detail": map[string]any{},
				"trend": map[string]any{},
			},
		},
		"entity": map[string]any{
			"stock": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "no_of_comments",
						"short": "Number of comments mentioning this stock",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "sentiment",
						"short": "Overall sentiment for the stock",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sentiment_score",
						"short": "Sentiment score ranging from -1 (most bearish) to 1 (most bullish)",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "ticker",
						"short": "Stock ticker symbol",
						"type": "`$STRING`",
					},
				},
				"name": "stock",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/apps/reddit",
								"parts": []any{
									"apps",
									"reddit",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"stock_detail": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "mentions",
						"short": "Number of times mentioned",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "no_of_comments",
						"short": "Total number of comments",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rank",
						"short": "Current rank among discussed stocks",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "sentiment",
						"short": "Overall sentiment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sentiment_score",
						"short": "Sentiment score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "ticker",
						"short": "Stock ticker symbol",
						"type": "`$STRING`",
					},
				},
				"name": "stock_detail",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "TSLA",
											"kind": "param",
											"name": "ticker",
											"orig": "ticker",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/apps/reddit/{ticker}",
								"parts": []any{
									"apps",
									"reddit",
									"{ticker}",
								},
								"select": map[string]any{
									"exist": []any{
										"ticker",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"reddit",
						},
					},
				},
			},
			"trend": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "no_of_comments",
						"short": "Number of comments mentioning this stock",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "sentiment",
						"short": "Overall sentiment for the stock",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "sentiment_score",
						"short": "Sentiment score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "ticker",
						"short": "Stock ticker symbol",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "trend_score",
						"short": "Trending momentum score",
						"type": "`$NUMBER`",
					},
				},
				"name": "trend",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/apps/reddit/trend",
								"parts": []any{
									"apps",
									"reddit",
									"trend",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
