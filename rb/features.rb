# RedditStocks SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module RedditStocksFeatures
  def self.make_feature(name)
    case name
    when "base"
      RedditStocksBaseFeature.new
    when "test"
      RedditStocksTestFeature.new
    else
      RedditStocksBaseFeature.new
    end
  end
end
