import { RedditStocksEntityBase } from '../RedditStocksEntityBase';
import type { RedditStocksSDK } from '../RedditStocksSDK';
import type { Control } from '../types';
import type { Trend, TrendListMatch } from '../RedditStocksTypes';
declare class TrendEntity extends RedditStocksEntityBase<Trend> {
    constructor(client: RedditStocksSDK, entopts: any);
    make(this: TrendEntity): TrendEntity;
    list(this: any, reqmatch?: TrendListMatch, ctrl?: Control): Promise<TrendEntity[]>;
}
export { TrendEntity };
