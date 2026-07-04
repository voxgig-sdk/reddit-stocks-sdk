# Typed models for the RedditStocks SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Stock:
    no_of_comment: Optional[int] = None
    sentiment: Optional[str] = None
    sentiment_score: Optional[float] = None
    ticker: Optional[str] = None


@dataclass
class StockListMatch:
    no_of_comment: Optional[int] = None
    sentiment: Optional[str] = None
    sentiment_score: Optional[float] = None
    ticker: Optional[str] = None


@dataclass
class StockDetail:
    mention: Optional[int] = None
    no_of_comment: Optional[int] = None
    rank: Optional[int] = None
    sentiment: Optional[str] = None
    sentiment_score: Optional[float] = None
    ticker: Optional[str] = None


@dataclass
class StockDetailLoadMatch:
    ticker: str


@dataclass
class Trend:
    no_of_comment: Optional[int] = None
    sentiment: Optional[str] = None
    sentiment_score: Optional[float] = None
    ticker: Optional[str] = None
    trend_score: Optional[float] = None


@dataclass
class TrendListMatch:
    no_of_comment: Optional[int] = None
    sentiment: Optional[str] = None
    sentiment_score: Optional[float] = None
    ticker: Optional[str] = None
    trend_score: Optional[float] = None

