<?php
declare(strict_types=1);

// RedditStocks SDK exists test

require_once __DIR__ . '/../redditstocks_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = RedditStocksSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
