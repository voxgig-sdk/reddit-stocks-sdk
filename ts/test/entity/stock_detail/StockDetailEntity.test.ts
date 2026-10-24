

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { RedditStocksSDK, BaseFeature, config, stdutil } from '../../..'

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


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('stock_detail hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of RedditStocksSDK.test(offline).StockDetail().stream('list')) { }
    }, /offline/)

    for await (const _item of RedditStocksSDK.test(offline).StockDetail()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = RedditStocksSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.StockDetail().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of RedditStocksSDK.test().StockDetail().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new RedditStocksSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.StockDetail().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.StockDetail().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = RedditStocksSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.StockDetail().list({"mentions":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.REDDIT_STOCKS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'stock_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"mentions":{"a":true,"h":"Mentions","n":"mentions","r":false,"sh":"Number of times mentioned","t":"`$INTEGER`","key$":"mentions","index$":0},"no_of_comments":{"a":true,"h":"No Of Comments","n":"no_of_comments","r":false,"sh":"Total number of comments","t":"`$INTEGER`","key$":"no_of_comments","index$":1},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"sh":"Current rank among discussed stocks","t":"`$INTEGER`","key$":"rank","index$":2},"sentiment":{"a":true,"h":"Sentiment","n":"sentiment","r":false,"sh":"Overall sentiment","t":"`$STRING`","key$":"sentiment","index$":3},"sentiment_score":{"a":true,"fo":"float","h":"Sentiment Score","n":"sentiment_score","r":false,"sh":"Sentiment score","t":"`$NUMBER`","key$":"sentiment_score","index$":4},"ticker":{"a":true,"h":"Ticker","n":"ticker","r":false,"sh":"Stock ticker symbol","t":"`$STRING`","key$":"ticker","index$":5}},"name":"stock_detail","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /apps/reddit","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/apps/reddit","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"apps"},{"lit":"reddit"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /apps/reddit/{ticker}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"TSLA","k":"param","n":"ticker","or":"ticker","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/apps/reddit/{ticker}","q":{"exist":["ticker"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"apps"},{"lit":"reddit"},{"var":"ticker"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"stock_detail","name__orig":"stock_detail","Name":"StockDetail","name_":"stock_detail","name-":"stock-detail","NAME":"STOCK_DETAIL","index$":0}, {"active":true,"entity":"stock_detail","key$":"BasicStockDetailFlow","kind":"basic","name":"BasicStockDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"stock_detail_ref01"}}],"index$":0},{"a":false,"d":{},"i":{"ref":"stock_detail_ref01","srcdatavar":"stock_detail_ref01_data","suffix":"_dt0"},"m":{"id":"stock_detail01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stock_detail_ref01"}}],"unreachable":true}]}, 'StockDetail', {"GET /apps/reddit":{"protocol":"http","parameters":[]},"GET /apps/reddit/{ticker}":{"protocol":"http","parameters":[{"name":"ticker","in":"path","description":"Stock ticker symbol (e.g., TSLA, AAPL, GME)","required":true,"schema":{"type":"string","example":"TSLA"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let stock_detail_ref01_data = Object.values(setup.data.existing.stock_detail)[0] as any

    // LIST
    const stock_detail_ref01_ent = client.StockDetail()
    const stock_detail_ref01_match: any = {}

    const stock_detail_ref01_list = (await stock_detail_ref01_ent.list(stock_detail_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
