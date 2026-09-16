

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"mentions","req":false,"short":"Number of times mentioned","type":"`$INTEGER`","index$":0},{"active":true,"name":"no_of_comments","req":false,"short":"Total number of comments","type":"`$INTEGER`","index$":1},{"active":true,"name":"rank","req":false,"short":"Current rank among discussed stocks","type":"`$INTEGER`","index$":2},{"active":true,"name":"sentiment","req":false,"short":"Overall sentiment","type":"`$STRING`","index$":3},{"active":true,"format":"float","name":"sentiment_score","req":false,"short":"Sentiment score","type":"`$NUMBER`","index$":4},{"active":true,"name":"ticker","req":false,"short":"Stock ticker symbol","type":"`$STRING`","index$":5}],"name":"stock_detail","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"TSLA","kind":"param","name":"ticker","orig":"ticker","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /apps/reddit/{ticker}","json":"{\"operationId\":\"getStockByTicker\",\"parameters\":[{\"description\":\"Stock ticker symbol (e.g., TSLA, AAPL, GME)\",\"in\":\"path\",\"name\":\"ticker\",\"required\":true,\"schema\":{\"example\":\"TSLA\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"mentions\":{\"description\":\"Number of times mentioned\",\"example\":678,\"type\":\"integer\"},\"no_of_comments\":{\"description\":\"Total number of comments\",\"example\":523,\"type\":\"integer\"},\"rank\":{\"description\":\"Current rank among discussed stocks\",\"example\":3,\"type\":\"integer\"},\"sentiment\":{\"description\":\"Overall sentiment\",\"example\":\"Bullish\",\"type\":\"string\"},\"sentiment_score\":{\"description\":\"Sentiment score\",\"example\":0.234,\"format\":\"float\",\"type\":\"number\"},\"ticker\":{\"description\":\"Stock ticker symbol\",\"example\":\"TSLA\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with stock details\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"An error occurred\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"Unable to fetch stock data\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Stock ticker not found\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"An error occurred\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"Unable to fetch stock data\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/apps/reddit/{ticker}","segments":[{"lit":"apps"},{"lit":"reddit"},{"var":"ticker"}],"select":{"exist":["ticker"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["reddit"]]},"key$":"stock_detail","name__orig":"stock_detail","Name":"StockDetail","name_":"stock_detail","name-":"stock-detail","NAME":"STOCK_DETAIL","index$":1}, {"active":true,"entity":"stock_detail","key$":"BasicStockDetailFlow","kind":"basic","name":"BasicStockDetailFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"stock_detail_ref01","srcdatavar":"stock_detail_ref01_data","suffix":"_dt0"},"match":{"id":"stock_detail01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stock_detail_ref01"}}],"index$":0}]}, 'StockDetail')
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
    ['stock_detail01','stock_detail02','stock_detail03','reddit01','reddit02','reddit03'],
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
  
