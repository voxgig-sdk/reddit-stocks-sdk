# RedditStocks SDK utility: make_context
require_relative '../core/context'
module RedditStocksUtilities
  MakeContext = ->(ctxmap, basectx) {
    RedditStocksContext.new(ctxmap, basectx)
  }
end
