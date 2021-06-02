package test

import (
	"api/src/application"
	"testing"

	"github.com/go-playground/assert/v2"
	"github.com/joho/godotenv"
)

func Test存在するユーザーID(t *testing.T) {
	godotenv.Load(".env.development")
	authApplicationService := application.NewAuthApplicaionService()

	const userId uint = 1
	isAuth := authApplicationService.Authorization(userId)
	assert.Equal(t, isAuth, true)
}

func Test存在しないユーザーID(t *testing.T) {
	godotenv.Load(".env.development")
	authApplicationService := application.NewAuthApplicaionService()

	const userId uint = 0
	isAuth := authApplicationService.Authorization(userId)
	assert.Equal(t, isAuth, false)
}
