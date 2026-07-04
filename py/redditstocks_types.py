# Typed models for the RedditStocks SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Stock(TypedDict, total=False):
    no_of_comment: int
    sentiment: str
    sentiment_score: float
    ticker: str


class StockListMatch(TypedDict, total=False):
    no_of_comment: int
    sentiment: str
    sentiment_score: float
    ticker: str


class StockDetail(TypedDict, total=False):
    mention: int
    no_of_comment: int
    rank: int
    sentiment: str
    sentiment_score: float
    ticker: str


class StockDetailLoadMatch(TypedDict):
    ticker: str


class Trend(TypedDict, total=False):
    no_of_comment: int
    sentiment: str
    sentiment_score: float
    ticker: str
    trend_score: float


class TrendListMatch(TypedDict, total=False):
    no_of_comment: int
    sentiment: str
    sentiment_score: float
    ticker: str
    trend_score: float
