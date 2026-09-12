import { RedditStocksEntityBase } from '../RedditStocksEntityBase';
import type { RedditStocksSDK } from '../RedditStocksSDK';
import type { Control } from '../types';
import type { StockDetail, StockDetailLoadMatch } from '../RedditStocksTypes';
declare class StockDetailEntity extends RedditStocksEntityBase<StockDetail> {
    constructor(client: RedditStocksSDK, entopts: any);
    make(this: StockDetailEntity): StockDetailEntity;
    load(this: any, reqmatch?: StockDetailLoadMatch, ctrl?: Control): Promise<StockDetailEntity>;
}
export { StockDetailEntity };
