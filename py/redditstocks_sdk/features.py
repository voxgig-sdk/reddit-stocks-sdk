# RedditStocks SDK feature factory

from redditstocks_sdk.feature.base_feature import RedditStocksBaseFeature
from redditstocks_sdk.feature.test_feature import RedditStocksTestFeature


def _make_feature(name):
    features = {
        "base": lambda: RedditStocksBaseFeature(),
        "test": lambda: RedditStocksTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
