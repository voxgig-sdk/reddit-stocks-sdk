import { Context } from './Context';
declare class RedditStocksError extends Error {
    isRedditStocksError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { RedditStocksError };
