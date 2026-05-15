<?php
declare(strict_types=1);

// RedditStocks SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class RedditStocksFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new RedditStocksBaseFeature();
            case "test":
                return new RedditStocksTestFeature();
            default:
                return new RedditStocksBaseFeature();
        }
    }
}
