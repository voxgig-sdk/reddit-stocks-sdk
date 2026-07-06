# RedditStocks Ruby SDK Reference

Complete API reference for the RedditStocks Ruby SDK.


## RedditStocksSDK

### Constructor

```ruby
require_relative 'RedditStocks_sdk'

client = RedditStocksSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RedditStocksSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = RedditStocksSDK.test
```


### Instance Methods

#### `Stock(data = nil)`

Create a new `Stock` entity instance. Pass `nil` for no initial data.

#### `StockDetail(data = nil)`

Create a new `StockDetail` entity instance. Pass `nil` for no initial data.

#### `Trend(data = nil)`

Create a new `Trend` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## StockEntity

```ruby
stock = client.Stock
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `no_of_comment` | `Integer` | No |  |
| `sentiment` | `String` | No |  |
| `sentiment_score` | `Float` | No |  |
| `ticker` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Stock.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StockEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StockDetailEntity

```ruby
stock_detail = client.StockDetail
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mention` | `Integer` | No |  |
| `no_of_comment` | `Integer` | No |  |
| `rank` | `Integer` | No |  |
| `sentiment` | `String` | No |  |
| `sentiment_score` | `Float` | No |  |
| `ticker` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.StockDetail.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StockDetailEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TrendEntity

```ruby
trend = client.Trend
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `no_of_comment` | `Integer` | No |  |
| `sentiment` | `String` | No |  |
| `sentiment_score` | `Float` | No |  |
| `ticker` | `String` | No |  |
| `trend_score` | `Float` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Trend.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TrendEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = RedditStocksSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

