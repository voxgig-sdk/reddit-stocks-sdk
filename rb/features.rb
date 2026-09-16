# RedditStocks SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module RedditStocksFeatures
  def self.make_feature(name)
    case name
    when "base"
      RedditStocksBaseFeature.new
    when "ratelimit"
      RedditStocksRatelimitFeature.new
    when "retry"
      RedditStocksRetryFeature.new
    when "test"
      RedditStocksTestFeature.new
    when "timeout"
      RedditStocksTimeoutFeature.new
    else
      RedditStocksBaseFeature.new
    end
  end
end
