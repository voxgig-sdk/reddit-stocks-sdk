# RedditStocks SDK utility: prepare_body
require_relative 'media'
module RedditStocksUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return RedditStocksUtilities.raw_body(ctx.reqdata) if RedditStocksUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
