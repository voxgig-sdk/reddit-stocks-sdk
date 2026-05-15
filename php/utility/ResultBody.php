<?php
declare(strict_types=1);

// RedditStocks SDK utility: result_body

class RedditStocksResultBody
{
    public static function call(RedditStocksContext $ctx): ?RedditStocksResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
