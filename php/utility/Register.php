<?php
declare(strict_types=1);

// RedditStocks SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

RedditStocksUtility::setRegistrar(function (RedditStocksUtility $u): void {
    $u->clean = [RedditStocksClean::class, 'call'];
    $u->done = [RedditStocksDone::class, 'call'];
    $u->make_error = [RedditStocksMakeError::class, 'call'];
    $u->feature_add = [RedditStocksFeatureAdd::class, 'call'];
    $u->feature_hook = [RedditStocksFeatureHook::class, 'call'];
    $u->feature_init = [RedditStocksFeatureInit::class, 'call'];
    $u->fetcher = [RedditStocksFetcher::class, 'call'];
    $u->make_fetch_def = [RedditStocksMakeFetchDef::class, 'call'];
    $u->make_context = [RedditStocksMakeContext::class, 'call'];
    $u->make_options = [RedditStocksMakeOptions::class, 'call'];
    $u->make_request = [RedditStocksMakeRequest::class, 'call'];
    $u->make_response = [RedditStocksMakeResponse::class, 'call'];
    $u->make_result = [RedditStocksMakeResult::class, 'call'];
    $u->make_point = [RedditStocksMakePoint::class, 'call'];
    $u->make_spec = [RedditStocksMakeSpec::class, 'call'];
    $u->make_url = [RedditStocksMakeUrl::class, 'call'];
    $u->param = [RedditStocksParam::class, 'call'];
    $u->prepare_auth = [RedditStocksPrepareAuth::class, 'call'];
    $u->prepare_body = [RedditStocksPrepareBody::class, 'call'];
    $u->prepare_headers = [RedditStocksPrepareHeaders::class, 'call'];
    $u->prepare_method = [RedditStocksPrepareMethod::class, 'call'];
    $u->prepare_params = [RedditStocksPrepareParams::class, 'call'];
    $u->prepare_path = [RedditStocksPreparePath::class, 'call'];
    $u->prepare_query = [RedditStocksPrepareQuery::class, 'call'];
    $u->result_basic = [RedditStocksResultBasic::class, 'call'];
    $u->result_body = [RedditStocksResultBody::class, 'call'];
    $u->result_headers = [RedditStocksResultHeaders::class, 'call'];
    $u->transform_request = [RedditStocksTransformRequest::class, 'call'];
    $u->transform_response = [RedditStocksTransformResponse::class, 'call'];
});
