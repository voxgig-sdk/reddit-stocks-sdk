<?php
declare(strict_types=1);

// RedditStocks SDK utility: prepare_body

class RedditStocksPrepareBody
{
    public static function call(RedditStocksContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
