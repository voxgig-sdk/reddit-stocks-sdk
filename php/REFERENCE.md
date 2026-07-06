# RedditStocks PHP SDK Reference

Complete API reference for the RedditStocks PHP SDK.


## RedditStocksSDK

### Constructor

```php
require_once __DIR__ . '/redditstocks_sdk.php';

$client = new RedditStocksSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `RedditStocksSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = RedditStocksSDK::test();
```


### Instance Methods

#### `Stock($data = null)`

Create a new `StockEntity` instance. Pass `null` for no initial data.

#### `StockDetail($data = null)`

Create a new `StockDetailEntity` instance. Pass `null` for no initial data.

#### `Trend($data = null)`

Create a new `TrendEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): RedditStocksUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## StockEntity

```php
$stock = $client->Stock();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `no_of_comment` | `int` | No |  |
| `sentiment` | `string` | No |  |
| `sentiment_score` | `float` | No |  |
| `ticker` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Stock()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StockEntity`

Create a new `StockEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StockDetailEntity

```php
$stock_detail = $client->StockDetail();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `mention` | `int` | No |  |
| `no_of_comment` | `int` | No |  |
| `rank` | `int` | No |  |
| `sentiment` | `string` | No |  |
| `sentiment_score` | `float` | No |  |
| `ticker` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->StockDetail()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StockDetailEntity`

Create a new `StockDetailEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TrendEntity

```php
$trend = $client->Trend();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `no_of_comment` | `int` | No |  |
| `sentiment` | `string` | No |  |
| `sentiment_score` | `float` | No |  |
| `ticker` | `string` | No |  |
| `trend_score` | `float` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Trend()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TrendEntity`

Create a new `TrendEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new RedditStocksSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

