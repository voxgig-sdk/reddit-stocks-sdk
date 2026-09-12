import { RedditStocksEntityBase } from '../RedditStocksEntityBase';
import type { RedditStocksSDK } from '../RedditStocksSDK';
import type { Control } from '../types';
import type { Stock, StockListMatch } from '../RedditStocksTypes';
declare class StockEntity extends RedditStocksEntityBase<Stock> {
    constructor(client: RedditStocksSDK, entopts: any);
    make(this: StockEntity): StockEntity;
    list(this: any, reqmatch?: StockListMatch, ctrl?: Control): Promise<StockEntity[]>;
}
export { StockEntity };
