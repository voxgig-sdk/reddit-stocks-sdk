# RedditStocks PHP SDK Reference

Complete API reference for the RedditStocks PHP SDK.


## RedditStocksSDK

### Constructor

```php
require_once __DIR__ . '/reddit-stocks_sdk.php';

$client = new RedditStocksSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## StockEntity

```php
$stock = $client->Stock();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `no_of_comment` | ``$INTEGER`` | No |  |
| `sentiment` | ``$STRING`` | No |  |
| `sentiment_score` | ``$NUMBER`` | No |  |
| `ticker` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Stock()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StockEntity`

Create a new `StockEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StockDetailEntity

```php
$stock_detail = $client->StockDetail();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->StockDetail()->load(["id" => "stock_detail_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StockDetailEntity`

Create a new `StockDetailEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TrendEntity

```php
$trend = $client->Trend();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Trend()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TrendEntity`

Create a new `TrendEntity` instance with the same client and
options.

#### `getName(): string`

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

