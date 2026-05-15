<?php
declare(strict_types=1);

// RedditStocks SDK utility: feature_hook

class RedditStocksFeatureHook
{
    public static function call(RedditStocksContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
