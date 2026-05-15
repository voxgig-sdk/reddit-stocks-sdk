# RedditStocks SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

RedditStocksUtility.registrar = ->(u) {
  u.clean = RedditStocksUtilities::Clean
  u.done = RedditStocksUtilities::Done
  u.make_error = RedditStocksUtilities::MakeError
  u.feature_add = RedditStocksUtilities::FeatureAdd
  u.feature_hook = RedditStocksUtilities::FeatureHook
  u.feature_init = RedditStocksUtilities::FeatureInit
  u.fetcher = RedditStocksUtilities::Fetcher
  u.make_fetch_def = RedditStocksUtilities::MakeFetchDef
  u.make_context = RedditStocksUtilities::MakeContext
  u.make_options = RedditStocksUtilities::MakeOptions
  u.make_request = RedditStocksUtilities::MakeRequest
  u.make_response = RedditStocksUtilities::MakeResponse
  u.make_result = RedditStocksUtilities::MakeResult
  u.make_point = RedditStocksUtilities::MakePoint
  u.make_spec = RedditStocksUtilities::MakeSpec
  u.make_url = RedditStocksUtilities::MakeUrl
  u.param = RedditStocksUtilities::Param
  u.prepare_auth = RedditStocksUtilities::PrepareAuth
  u.prepare_body = RedditStocksUtilities::PrepareBody
  u.prepare_headers = RedditStocksUtilities::PrepareHeaders
  u.prepare_method = RedditStocksUtilities::PrepareMethod
  u.prepare_params = RedditStocksUtilities::PrepareParams
  u.prepare_path = RedditStocksUtilities::PreparePath
  u.prepare_query = RedditStocksUtilities::PrepareQuery
  u.result_basic = RedditStocksUtilities::ResultBasic
  u.result_body = RedditStocksUtilities::ResultBody
  u.result_headers = RedditStocksUtilities::ResultHeaders
  u.transform_request = RedditStocksUtilities::TransformRequest
  u.transform_response = RedditStocksUtilities::TransformResponse
}
