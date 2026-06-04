# RedditStocks SDK

Top 50 stocks discussed on the r/WallStreetBets subreddit, refreshed daily

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Reddit Stocks

[Reddit Stocks](https://tradestie.com/apps/reddit/) is a small public endpoint published by [Tradestie](https://tradestie.com) that surfaces the most-talked-about tickers on the r/WallStreetBets subreddit. The API powers Tradestie's own dashboards and is exposed for free use by other developers.

What you get from the API:

- A ranked list of up to 50 stock tickers most frequently discussed on r/WallStreetBets.
- Per-ticker discussion volume and sentiment signal so you can see what retail traders are focused on.
- An optional `date` query parameter to retrieve the snapshot for a specific past day (format `MM-DD-YYYY`).

Operational notes: no API key or authentication is required, and the endpoints are documented as public. The catalogue page on freepublicapis.com notes that CORS is disabled, so browser-side calls may need a proxy. No rate limit is published, so be polite with request volume.

## Try it

**TypeScript**
```bash
npm install reddit-stocks
```

**Python**
```bash
pip install reddit-stocks-sdk
```

**PHP**
```bash
composer require voxgig/reddit-stocks-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/reddit-stocks-sdk/go
```

**Ruby**
```bash
gem install reddit-stocks-sdk
```

**Lua**
```bash
luarocks install reddit-stocks-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { RedditStocksSDK } from 'reddit-stocks'

const client = new RedditStocksSDK({})

// List all stocks
const stocks = await client.Stock().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o reddit-stocks-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "reddit-stocks": {
      "command": "/abs/path/to/reddit-stocks-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Stock** | A single ticker entry from the Reddit Stocks ranking, returned from `GET /apps/reddit` as part of the top-50 list. | `/apps/reddit` |
| **StockDetail** | Per-ticker detail for an individual symbol in the WallStreetBets ranking — typically the ticker plus its discussion count and sentiment score. | `/apps/reddit/{ticker}` |
| **Trend** | Historical ranking snapshot for a given day, accessed by passing `?date=MM-DD-YYYY` to `GET /apps/reddit` to see how mentions changed over time. | `/apps/reddit/trend` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from redditstocks_sdk import RedditStocksSDK

client = RedditStocksSDK({})

# List all stocks
stocks, err = client.Stock(None).list(None, None)
```

### PHP

```php
<?php
require_once 'redditstocks_sdk.php';

$client = new RedditStocksSDK([]);

// List all stocks
[$stocks, $err] = $client->Stock(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/reddit-stocks-sdk/go"

client := sdk.NewRedditStocksSDK(map[string]any{})

// List all stocks
stocks, err := client.Stock(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "RedditStocks_sdk"

client = RedditStocksSDK.new({})

# List all stocks
stocks, err = client.Stock(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("reddit-stocks_sdk")

local client = sdk.new({})

-- List all stocks
local stocks, err = client:Stock(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = RedditStocksSDK.test()
const result = await client.Stock().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = RedditStocksSDK.test(None, None)
result, err = client.Stock(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = RedditStocksSDK::test(null, null);
[$result, $err] = $client->Stock(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Stock(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = RedditStocksSDK.test(nil, nil)
result, err = client.Stock(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Stock(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Reddit Stocks

- Upstream: [https://tradestie.com/api/v1](https://tradestie.com/api/v1)
- API docs: [https://tradestie.com/apps/reddit/api/](https://tradestie.com/apps/reddit/api/)

- The provider ([Tradestie](https://tradestie.com)) does not publish an explicit data licence.
- The community catalogue page on [freepublicapis.com](https://freepublicapis.com/reddit-stocks) lists no licence either.
- Treat the data as informational only and confirm permitted use with Tradestie before commercial reuse.

---

Generated from the Reddit Stocks OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
