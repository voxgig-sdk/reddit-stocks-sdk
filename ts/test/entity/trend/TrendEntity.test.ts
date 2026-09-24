

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


describe('TrendEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when REDDIT_STOCKS_TEST_LIVE=TRUE.
  afterEach(liveDelay('REDDIT_STOCKS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = RedditStocksSDK.test()
    const ent = testsdk.Trend()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.REDDIT_STOCKS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'trend.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"no_of_comments":{"a":true,"h":"No Of Comments","n":"no_of_comments","r":false,"sh":"Number of comments mentioning this stock","t":"`$INTEGER`","key$":"no_of_comments","index$":0},"sentiment":{"a":true,"h":"Sentiment","n":"sentiment","r":false,"sh":"Overall sentiment for the stock","t":"`$STRING`","key$":"sentiment","index$":1},"sentiment_score":{"a":true,"fo":"float","h":"Sentiment Score","n":"sentiment_score","r":false,"sh":"Sentiment score","t":"`$NUMBER`","key$":"sentiment_score","index$":2},"ticker":{"a":true,"h":"Ticker","n":"ticker","r":false,"sh":"Stock ticker symbol","t":"`$STRING`","key$":"ticker","index$":3},"trend_score":{"a":true,"fo":"float","h":"Trend Score","n":"trend_score","r":false,"sh":"Trending momentum score","t":"`$NUMBER`","key$":"trend_score","index$":4}},"name":"trend","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /apps/reddit/trend","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/apps/reddit/trend","q":{},"r":{},"s":[{"lit":"apps"},{"lit":"reddit"},{"lit":"trend"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"trend","name__orig":"trend","Name":"Trend","name_":"trend","name-":"trend","NAME":"TREND","index$":2}, {"active":true,"entity":"trend","key$":"BasicTrendFlow","kind":"basic","name":"BasicTrendFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"trend_ref01"}}],"index$":0}]}, 'Trend', {"GET /apps/reddit/trend":{"protocol":"http","operationId":"getTrendingStocks","responses":{"200":{"description":"Successful response with trending stocks","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"ticker":{"type":"string","description":"Stock ticker symbol","example":"GME","key$":"ticker"},"no_of_comments":{"type":"integer","description":"Number of comments mentioning this stock","example":892,"key$":"no_of_comments"},"sentiment":{"type":"string","description":"Overall sentiment for the stock","enum":["Bullish","Bearish","Neutral"],"example":"Bullish","key$":"sentiment"},"sentiment_score":{"type":"number","format":"float","description":"Sentiment score","example":0.456,"key$":"sentiment_score"},"trend_score":{"type":"number","format":"float","description":"Trending momentum score","example":8.5,"key$":"trend_score"}},"x-ref":"#/components/schemas/TrendingStock","index$":0}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"An error occurred"},"message":{"type":"string","description":"Detailed error message","example":"Unable to fetch stock data"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let trend_ref01_data = Object.values(setup.data.existing.trend)[0] as any

    // LIST
    const trend_ref01_ent = client.Trend()
    const trend_ref01_match: any = {}

    const trend_ref01_list = (await trend_ref01_ent.list(trend_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/trend/TrendTestData.json')

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
    ['trend01','trend02','trend03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'REDDIT_STOCKS_TEST_TREND_ENTID': idmap,
    'REDDIT_STOCKS_TEST_LIVE': 'FALSE',
    'REDDIT_STOCKS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['REDDIT_STOCKS_TEST_TREND_ENTID']

  const live = 'TRUE' === env.REDDIT_STOCKS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['REDDIT_STOCKS_TEST_TREND_ENTID']
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
  
