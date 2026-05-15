<?php
declare(strict_types=1);

// RedditStocks SDK utility: result_headers

class RedditStocksResultHeaders
{
    public static function call(RedditStocksContext $ctx): ?RedditStocksResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
