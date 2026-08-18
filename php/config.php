<?php
declare(strict_types=1);

// RedditStocks SDK configuration

class RedditStocksConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "RedditStocks",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://tradestie.com/api/v1",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "stock" => [],
                    "stock_detail" => [],
                    "trend" => [],
                ],
            ],
            "entity" => [
        'stock' => [
          'fields' => [
            [
              'name' => 'no_of_comments',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'sentiment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sentiment_score',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'ticker',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'stock',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/apps/reddit',
                  'parts' => [
                    'apps',
                    'reddit',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'stock_detail' => [
          'fields' => [
            [
              'name' => 'mentions',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'no_of_comments',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'rank',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'sentiment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sentiment_score',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'ticker',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'stock_detail',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'TSLA',
                        'kind' => 'param',
                        'name' => 'ticker',
                        'orig' => 'ticker',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/apps/reddit/{ticker}',
                  'parts' => [
                    'apps',
                    'reddit',
                    '{ticker}',
                  ],
                  'select' => [
                    'exist' => [
                      'ticker',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'reddit',
              ],
            ],
          ],
        ],
        'trend' => [
          'fields' => [
            [
              'name' => 'no_of_comments',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'sentiment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'sentiment_score',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'ticker',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'trend_score',
              'type' => '`$NUMBER`',
            ],
          ],
          'name' => 'trend',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/apps/reddit/trend',
                  'parts' => [
                    'apps',
                    'reddit',
                    'trend',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return RedditStocksFeatures::make_feature($name);
    }
}
