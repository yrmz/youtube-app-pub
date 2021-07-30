package middleware

import (
	"fmt"
	"os"

	"github.com/getsentry/sentry-go"
	sentrygin "github.com/getsentry/sentry-go/gin"
	"github.com/gin-gonic/gin"
)

type sentryGin struct {
	SentryHandler gin.HandlerFunc
}

func SetSentry() *sentryGin {
	if err := sentry.Init(sentry.ClientOptions{
		Dsn:              os.Getenv("SENTRY_DSN"),
		TracesSampleRate: 1.0,
		Environment:      os.Getenv("SENTRY_ENVIRONMENT"),
	}); err != nil {
		fmt.Printf("Sentry initialization failed: %v\n", err)
	}

	sentryHandler := sentrygin.New(sentrygin.Options{
		Repanic: true,
	})

	return &sentryGin{
		SentryHandler: sentryHandler,
	}
}

func (s sentryGin) HubScopeHandler(ctx *gin.Context) {
	if hub := sentrygin.GetHubFromContext(ctx); hub != nil {
		hub.Scope().SetTag("someRandomTag", "maybeYouNeedIt")
	}
	ctx.Next()
}
