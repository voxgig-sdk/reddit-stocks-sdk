package core

type RedditStocksError struct {
	IsRedditStocksError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewRedditStocksError(code string, msg string, ctx *Context) *RedditStocksError {
	return &RedditStocksError{
		IsRedditStocksError: true,
		Sdk:              "RedditStocks",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *RedditStocksError) Error() string {
	return e.Msg
}
