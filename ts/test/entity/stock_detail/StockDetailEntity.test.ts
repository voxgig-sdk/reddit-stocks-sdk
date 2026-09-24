

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { RedditStocksSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('StockDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when REDDIT_STOCKS_TEST_LIVE=TRUE.
  afterEach(liveDelay('REDDIT_STOCKS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RedditStocksSDK.test()
    const ent = testsdk.StockDetail()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.REDDIT_STOCKS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'stock_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"mentions":{"a":true,"h":"Mentions","n":"mentions","r":false,"sh":"Number of times mentioned","t":"`$INTEGER`","key$":"mentions","index$":0},"no_of_comments":{"a":true,"h":"No Of Comments","n":"no_of_comments","r":false,"sh":"Total number of comments","t":"`$INTEGER`","key$":"no_of_comments","index$":1},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"sh":"Current rank among discussed stocks","t":"`$INTEGER`","key$":"rank","index$":2},"sentiment":{"a":true,"h":"Sentiment","n":"sentiment","r":false,"sh":"Overall sentiment","t":"`$STRING`","key$":"sentiment","index$":3},"sentiment_score":{"a":true,"fo":"float","h":"Sentiment Score","n":"sentiment_score","r":false,"sh":"Sentiment score","t":"`$NUMBER`","key$":"sentiment_score","index$":4},"ticker":{"a":true,"h":"Ticker","n":"ticker","r":false,"sh":"Stock ticker symbol","t":"`$STRING`","key$":"ticker","index$":5}},"name":"stock_detail","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /apps/reddit/{ticker}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"TSLA","k":"param","n":"ticker","or":"ticker","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/apps/reddit/{ticker}","q":{"exist":["ticker"]},"r":{},"s":[{"lit":"apps"},{"lit":"reddit"},{"var":"ticker"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"stock_detail","name__orig":"stock_detail","Name":"StockDetail","name_":"stock_detail","name-":"stock-detail","NAME":"STOCK_DETAIL","index$":1}, {"active":true,"entity":"stock_detail","key$":"BasicStockDetailFlow","kind":"basic","name":"BasicStockDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"stock_detail_ref01","srcdatavar":"stock_detail_ref01_data","suffix":"_dt0"},"m":{"id":"stock_detail01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stock_detail_ref01"}}],"index$":0}]}, 'StockDetail', {"GET /apps/reddit/{ticker}":{"protocol":"http","operationId":"getStockByTicker","responses":{"200":{"description":"Successful response with stock details","content":{"application/json":{"schema":{"type":"object","properties":{"ticker":{"type":"string","description":"Stock ticker symbol","example":"TSLA","key$":"ticker"},"no_of_comments":{"type":"integer","description":"Total number of comments","example":523,"key$":"no_of_comments"},"sentiment":{"type":"string","description":"Overall sentiment","example":"Bullish","key$":"sentiment"},"sentiment_score":{"type":"number","format":"float","description":"Sentiment score","example":0.234,"key$":"sentiment_score"},"mentions":{"type":"integer","description":"Number of times mentioned","example":678,"key$":"mentions"},"rank":{"type":"integer","description":"Current rank among discussed stocks","example":3,"key$":"rank"}},"x-ref":"#/components/schemas/StockDetail","index$":0}}}},"404":{"description":"Stock ticker not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"An error occurred"},"message":{"type":"string","description":"Detailed error message","example":"Unable to fetch stock data"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"An error occurred"},"message":{"type":"string","description":"Detailed error message","example":"Unable to fetch stock data"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"ticker","in":"path","description":"Stock ticker symbol (e.g., TSLA, AAPL, GME)","required":true,"schema":{"type":"string","example":"TSLA"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let stock_detail_ref01_data = Object.values(setup.data.existing.stock_detail)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const stock_detail_ref01_ent = client.StockDetail()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/stock_detail/StockDetailTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = RedditStocksSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['stock_detail01','stock_detail02','stock_detail03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'REDDIT_STOCKS_TEST_STOCK_DETAIL_ENTID': idmap,
    'REDDIT_STOCKS_TEST_LIVE': 'FALSE',
    'REDDIT_STOCKS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['REDDIT_STOCKS_TEST_STOCK_DETAIL_ENTID']

  const live = 'TRUE' === env.REDDIT_STOCKS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['REDDIT_STOCKS_TEST_STOCK_DETAIL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new RedditStocksSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.REDDIT_STOCKS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
