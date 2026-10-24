import { StockDetailEntity } from './entity/StockDetailEntity';
import { TrendEntity } from './entity/TrendEntity';
export type * from './RedditStocksTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { RedditStocksEntityBase } from './RedditStocksEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class RedditStocksSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    StockDetail(entopts?: Record<string, any>): StockDetailEntity;
    Trend(entopts?: Record<string, any>): TrendEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): RedditStocksSDK;
    tester(testopts?: any, sdkopts?: any): RedditStocksSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof RedditStocksSDK;
export { stdutil, config, BaseFeature, RedditStocksEntityBase, RedditStocksSDK, SDK, };
export type { DirectResult };
