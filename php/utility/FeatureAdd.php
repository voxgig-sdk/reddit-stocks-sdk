<?php
declare(strict_types=1);

// RedditStocks SDK utility: feature_add

class RedditStocksFeatureAdd
{
    public static function call(RedditStocksContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
