import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "stock_detail",
    "accessor": "StockDetail",
    "op": "list",
    "method": "GET",
    "path": "/apps/reddit",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "no_of_comments": 523,
        "sentiment": "Bullish",
        "sentiment_score": 0.234,
        "ticker": "TSLA"
      },
      {
        "no_of_comments": 412,
        "sentiment": "Bearish",
        "sentiment_score": -0.123,
        "ticker": "AAPL"
      }
    ],
    "idField": "id"
  },
  {
    "entity": "stock_detail",
    "accessor": "StockDetail",
    "op": "load",
    "method": "GET",
    "path": "/apps/reddit/{ticker}",
    "args": [
      {
        "name": "ticker",
        "wire": "ticker",
        "value": "TSLA"
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "ticker": "TSLA",
      "no_of_comments": 523,
      "sentiment": "Bullish",
      "sentiment_score": 0.234,
      "mentions": 678,
      "rank": 3
    },
    "idField": "id"
  },
  {
    "entity": "trend",
    "accessor": "Trend",
    "op": "list",
    "method": "GET",
    "path": "/apps/reddit/trend",
    "args": [],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "ticker": "GME",
        "no_of_comments": 892,
        "sentiment": "Bullish",
        "sentiment_score": 0.456,
        "trend_score": 8.5
      }
    ],
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
