<?php
declare(strict_types=1);

// StockDetail entity test

require_once __DIR__ . '/../redditstocks_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class StockDetailEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = RedditStocksSDK::test(null, null);
        $ent = $testsdk->StockDetail(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = stock_detail_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "stock_detail." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set REDDITSTOCKS_TEST_STOCK_DETAIL_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $stock_detail_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.stock_detail")));
        $stock_detail_ref01_data = null;
        if (count($stock_detail_ref01_data_raw) > 0) {
            $stock_detail_ref01_data = Helpers::to_map($stock_detail_ref01_data_raw[0][1]);
        }

        // LOAD
        $stock_detail_ref01_ent = $client->StockDetail(null);
        $stock_detail_ref01_match_dt0 = [];
        [$stock_detail_ref01_data_dt0_loaded, $err] = $stock_detail_ref01_ent->load($stock_detail_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($stock_detail_ref01_data_dt0_loaded);

    }
}

function stock_detail_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/stock_detail/StockDetailTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = RedditStocksSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["stock_detail01", "stock_detail02", "stock_detail03", "reddit01", "reddit02", "reddit03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("REDDITSTOCKS_TEST_STOCK_DETAIL_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "REDDITSTOCKS_TEST_STOCK_DETAIL_ENTID" => $idmap,
        "REDDITSTOCKS_TEST_LIVE" => "FALSE",
        "REDDITSTOCKS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["REDDITSTOCKS_TEST_STOCK_DETAIL_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["REDDITSTOCKS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new RedditStocksSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["REDDITSTOCKS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["REDDITSTOCKS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
