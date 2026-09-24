
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { RedditStocksSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = RedditStocksSDK.test()
    equal(testsdk instanceof RedditStocksSDK, true,
      'RedditStocksSDK.test() must return a client synchronously')
  })

})
