# RedditStocks SDK utility: make_context

from core.context import RedditStocksContext


def make_context_util(ctxmap, basectx):
    return RedditStocksContext(ctxmap, basectx)
