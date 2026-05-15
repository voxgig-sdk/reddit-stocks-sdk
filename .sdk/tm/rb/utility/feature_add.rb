# RedditStocks SDK utility: feature_add
module RedditStocksUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
