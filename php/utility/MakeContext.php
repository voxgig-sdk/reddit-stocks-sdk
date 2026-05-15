<?php
declare(strict_types=1);

// RedditStocks SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class RedditStocksMakeContext
{
    public static function call(array $ctxmap, ?RedditStocksContext $basectx): RedditStocksContext
    {
        return new RedditStocksContext($ctxmap, $basectx);
    }
}
