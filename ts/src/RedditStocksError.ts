
import { Context } from './Context'


class RedditStocksError extends Error {

  isRedditStocksError = true

  sdk = 'RedditStocks'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  RedditStocksError
}

