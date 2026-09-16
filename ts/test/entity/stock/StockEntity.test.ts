

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


describe('StockEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when REDDIT_STOCKS_TEST_LIVE=TRUE.
  afterEach(liveDelay('REDDIT_STOCKS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RedditStocksSDK.test()
    const ent = testsdk.Stock()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.REDDIT_STOCKS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'stock.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"no_of_comments","req":false,"short":"Number of comments mentioning this stock","type":"`$INTEGER`","index$":0},{"active":true,"name":"sentiment","req":false,"short":"Overall sentiment for the stock","type":"`$STRING`","index$":1},{"active":true,"format":"float","name":"sentiment_score","req":false,"short":"Sentiment score ranging from -1 (most bearish) to 1 (most bullish)","type":"`$NUMBER`","index$":2},{"active":true,"name":"ticker","req":false,"short":"Stock ticker symbol","type":"`$STRING`","index$":3}],"name":"stock","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /apps/reddit","json":"{\"operationId\":\"getTopStocks\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":[{\"no_of_comments\":523,\"sentiment\":\"Bullish\",\"sentiment_score\":0.234,\"ticker\":\"TSLA\"},{\"no_of_comments\":412,\"sentiment\":\"Bearish\",\"sentiment_score\":-0.123,\"ticker\":\"AAPL\"}],\"schema\":{\"items\":{\"properties\":{\"no_of_comments\":{\"description\":\"Number of comments mentioning this stock\",\"example\":523,\"type\":\"integer\"},\"sentiment\":{\"description\":\"Overall sentiment for the stock\",\"enum\":[\"Bullish\",\"Bearish\",\"Neutral\"],\"example\":\"Bullish\",\"type\":\"string\"},\"sentiment_score\":{\"description\":\"Sentiment score ranging from -1 (most bearish) to 1 (most bullish)\",\"example\":0.234,\"format\":\"float\",\"type\":\"number\"},\"ticker\":{\"description\":\"Stock ticker symbol\",\"example\":\"TSLA\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response with list of top stocks\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"An error occurred\",\"type\":\"string\"},\"message\":{\"description\":\"Detailed error message\",\"example\":\"Unable to fetch stock data\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/apps/reddit","segments":[{"lit":"apps"},{"lit":"reddit"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"stock","name__orig":"stock","Name":"Stock","name_":"stock","name-":"stock","NAME":"STOCK","index$":0}, {"active":true,"entity":"stock","key$":"BasicStockFlow","kind":"basic","name":"BasicStockFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"stock_ref01"}}],"index$":0}]}, 'Stock')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let stock_ref01_data = Object.values(setup.data.existing.stock)[0] as any

    // LIST
    const stock_ref01_ent = client.Stock()
    const stock_ref01_match: any = {}

    const stock_ref01_list = (await stock_ref01_ent.list(stock_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/stock/StockTestData.json')

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
    ['stock01','stock02','stock03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'REDDIT_STOCKS_TEST_STOCK_ENTID': idmap,
    'REDDIT_STOCKS_TEST_LIVE': 'FALSE',
    'REDDIT_STOCKS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['REDDIT_STOCKS_TEST_STOCK_ENTID']

  const live = 'TRUE' === env.REDDIT_STOCKS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['REDDIT_STOCKS_TEST_STOCK_ENTID']
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
  
