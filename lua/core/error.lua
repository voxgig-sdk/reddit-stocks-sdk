-- RedditStocks SDK error

local RedditStocksError = {}
RedditStocksError.__index = RedditStocksError


function RedditStocksError.new(code, msg, ctx)
  local self = setmetatable({}, RedditStocksError)
  self.is_sdk_error = true
  self.sdk = "RedditStocks"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function RedditStocksError:error()
  return self.msg
end


function RedditStocksError:__tostring()
  return self.msg
end


return RedditStocksError
