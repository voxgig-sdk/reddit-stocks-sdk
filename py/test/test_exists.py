# ProjectName SDK exists test

import pytest
from redditstocks_sdk import RedditStocksSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = RedditStocksSDK.test(None, None)
        assert testsdk is not None
