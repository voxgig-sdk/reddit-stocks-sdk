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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"format": "float",
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
								"segments": []any{
									map[string]any{
										"lit": "apps",
									},
									map[string]any{
										"lit": "reddit",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"apps",
									"reddit",
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
						"format": "float",
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
								"segments": []any{
									map[string]any{
										"lit": "apps",
									},
									map[string]any{
										"lit": "reddit",
									},
									map[string]any{
										"var": "ticker",
									},
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
								"parts": []any{
									"apps",
									"reddit",
									"{ticker}",
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
						"format": "float",
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
						"format": "float",
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
								"segments": []any{
									map[string]any{
										"lit": "apps",
									},
									map[string]any{
										"lit": "reddit",
									},
									map[string]any{
										"lit": "trend",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"apps",
									"reddit",
									"trend",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
