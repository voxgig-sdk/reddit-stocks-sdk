<?php
declare(strict_types=1);

// RedditStocks SDK base feature

class RedditStocksBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(RedditStocksContext $ctx, array $options): void {}
    public function PostConstruct(RedditStocksContext $ctx): void {}
    public function PostConstructEntity(RedditStocksContext $ctx): void {}
    public function SetData(RedditStocksContext $ctx): void {}
    public function GetData(RedditStocksContext $ctx): void {}
    public function GetMatch(RedditStocksContext $ctx): void {}
    public function SetMatch(RedditStocksContext $ctx): void {}
    public function PrePoint(RedditStocksContext $ctx): void {}
    public function PreSpec(RedditStocksContext $ctx): void {}
    public function PreRequest(RedditStocksContext $ctx): void {}
    public function PreResponse(RedditStocksContext $ctx): void {}
    public function PreResult(RedditStocksContext $ctx): void {}
    public function PreDone(RedditStocksContext $ctx): void {}
    public function PreUnexpected(RedditStocksContext $ctx): void {}
}
