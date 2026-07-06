<?php
declare(strict_types=1);

// Typed models for the RedditStocks SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Stock entity data model. */
class Stock
{
    public ?int $no_of_comment = null;
    public ?string $sentiment = null;
    public ?float $sentiment_score = null;
    public ?string $ticker = null;
}

/** Request payload for Stock#list. */
class StockListMatch
{
    public ?int $no_of_comment = null;
    public ?string $sentiment = null;
    public ?float $sentiment_score = null;
    public ?string $ticker = null;
}

/** StockDetail entity data model. */
class StockDetail
{
    public ?int $mention = null;
    public ?int $no_of_comment = null;
    public ?int $rank = null;
    public ?string $sentiment = null;
    public ?float $sentiment_score = null;
    public ?string $ticker = null;
}

/** Request payload for StockDetail#load. */
class StockDetailLoadMatch
{
    public string $ticker;
}

/** Trend entity data model. */
class Trend
{
    public ?int $no_of_comment = null;
    public ?string $sentiment = null;
    public ?float $sentiment_score = null;
    public ?string $ticker = null;
    public ?float $trend_score = null;
}

/** Request payload for Trend#list. */
class TrendListMatch
{
    public ?int $no_of_comment = null;
    public ?string $sentiment = null;
    public ?float $sentiment_score = null;
    public ?string $ticker = null;
    public ?float $trend_score = null;
}

