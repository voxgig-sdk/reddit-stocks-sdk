# RedditStocks TypeScript SDK Reference

Complete API reference for the RedditStocks TypeScript SDK.


## RedditStocksSDK

### Constructor

```ts
new RedditStocksSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RedditStocksSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = RedditStocksSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `RedditStocksSDK` instance in test mode.


### Instance Methods

#### `Stock(data?: object)`

Create a new `Stock` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StockEntity` instance.

#### `StockDetail(data?: object)`

Create a new `StockDetail` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StockDetailEntity` instance.

#### `Trend(data?: object)`

Create a new `Trend` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TrendEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `RedditStocksSDK.test()`.

**Returns:** `RedditStocksSDK` instance in test mode.


---

## StockEntity

```ts
const stock = client.Stock()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `no_of_comment` | ``$INTEGER`` | No |  |
| `sentiment` | ``$STRING`` | No |  |
| `sentiment_score` | ``$NUMBER`` | No |  |
| `ticker` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Stock().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StockEntity` instance with the same client and
options.

#### `client()`

Return the parent `RedditStocksSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StockDetailEntity

```ts
const stock_detail = client.StockDetail()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mention` | ``$INTEGER`` | No |  |
| `no_of_comment` | ``$INTEGER`` | No |  |
| `rank` | ``$INTEGER`` | No |  |
| `sentiment` | ``$STRING`` | No |  |
| `sentiment_score` | ``$NUMBER`` | No |  |
| `ticker` | ``$STRING`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.StockDetail().load({ id: 'stock_detail_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StockDetailEntity` instance with the same client and
options.

#### `client()`

Return the parent `RedditStocksSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TrendEntity

```ts
const trend = client.Trend()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `no_of_comment` | ``$INTEGER`` | No |  |
| `sentiment` | ``$STRING`` | No |  |
| `sentiment_score` | ``$NUMBER`` | No |  |
| `ticker` | ``$STRING`` | No |  |
| `trend_score` | ``$NUMBER`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Trend().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TrendEntity` instance with the same client and
options.

#### `client()`

Return the parent `RedditStocksSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new RedditStocksSDK({
  feature: {
    test: { active: true },
  }
})
```

