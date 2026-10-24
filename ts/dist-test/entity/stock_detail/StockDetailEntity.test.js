"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('StockDetailEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when REDDIT_STOCKS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('REDDIT_STOCKS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.RedditStocksSDK.test();
        const ent = testsdk.StockDetail();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('stock_detail hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.RedditStocksSDK.test(offline).StockDetail().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.RedditStocksSDK.test(offline).StockDetail()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.RedditStocksSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.StockDetail().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.RedditStocksSDK.test().StockDetail().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.RedditStocksSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.StockDetail().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.StockDetail().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.RedditStocksSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.StockDetail().list({ "mentions": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.REDDIT_STOCKS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'stock_detail.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "mentions": { "a": true, "h": "Mentions", "n": "mentions", "r": false, "sh": "Number of times mentioned", "t": "`$INTEGER`", "key$": "mentions", "index$": 0 }, "no_of_comments": { "a": true, "h": "No Of Comments", "n": "no_of_comments", "r": false, "sh": "Total number of comments", "t": "`$INTEGER`", "key$": "no_of_comments", "index$": 1 }, "rank": { "a": true, "h": "Rank", "n": "rank", "r": false, "sh": "Current rank among discussed stocks", "t": "`$INTEGER`", "key$": "rank", "index$": 2 }, "sentiment": { "a": true, "h": "Sentiment", "n": "sentiment", "r": false, "sh": "Overall sentiment", "t": "`$STRING`", "key$": "sentiment", "index$": 3 }, "sentiment_score": { "a": true, "fo": "float", "h": "Sentiment Score", "n": "sentiment_score", "r": false, "sh": "Sentiment score", "t": "`$NUMBER`", "key$": "sentiment_score", "index$": 4 }, "ticker": { "a": true, "h": "Ticker", "n": "ticker", "r": false, "sh": "Stock ticker symbol", "t": "`$STRING`", "key$": "ticker", "index$": 5 } }, "name": "stock_detail", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /apps/reddit", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/apps/reddit", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "apps" }, { "lit": "reddit" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /apps/reddit/{ticker}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "TSLA", "k": "param", "n": "ticker", "or": "ticker", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/apps/reddit/{ticker}", "q": { "exist": ["ticker"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "apps" }, { "lit": "reddit" }, { "var": "ticker" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "stock_detail", "name__orig": "stock_detail", "Name": "StockDetail", "name_": "stock_detail", "name-": "stock-detail", "NAME": "STOCK_DETAIL", "index$": 0 }, { "active": true, "entity": "stock_detail", "key$": "BasicStockDetailFlow", "kind": "basic", "name": "BasicStockDetailFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "stock_detail_ref01" } }], "index$": 0 }, { "a": false, "d": {}, "i": { "ref": "stock_detail_ref01", "srcdatavar": "stock_detail_ref01_data", "suffix": "_dt0" }, "m": { "id": "stock_detail01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-stock_detail_ref01" } }], "unreachable": true }] }, 'StockDetail', { "GET /apps/reddit": { "protocol": "http", "parameters": [] }, "GET /apps/reddit/{ticker}": { "protocol": "http", "parameters": [{ "name": "ticker", "in": "path", "description": "Stock ticker symbol (e.g., TSLA, AAPL, GME)", "required": true, "schema": { "type": "string", "example": "TSLA" }, "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let stock_detail_ref01_data = Object.values(setup.data.existing.stock_detail)[0];
        // LIST
        const stock_detail_ref01_ent = client.StockDetail();
        const stock_detail_ref01_match = {};
        const stock_detail_ref01_list = (await stock_detail_ref01_ent.list(stock_detail_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/stock_detail/StockDetailTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.RedditStocksSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['stock_detail01', 'stock_detail02', 'stock_detail03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'REDDIT_STOCKS_TEST_STOCK_DETAIL_ENTID': idmap,
        'REDDIT_STOCKS_TEST_LIVE': 'FALSE',
        'REDDIT_STOCKS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['REDDIT_STOCKS_TEST_STOCK_DETAIL_ENTID'];
    const live = 'TRUE' === env.REDDIT_STOCKS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['REDDIT_STOCKS_TEST_STOCK_DETAIL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.RedditStocksSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=StockDetailEntity.test.js.map