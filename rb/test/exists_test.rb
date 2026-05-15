# RedditStocks SDK exists test

require "minitest/autorun"
require_relative "../RedditStocks_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = RedditStocksSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
