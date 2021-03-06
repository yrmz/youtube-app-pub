package main

import (
	"api/src/infrastructure/persistence"
	"api/src/middleware"
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load(fmt.Sprintf(".env.%s", os.Getenv("GO_ENV")))
	if err != nil {
		panic(err)
	}

	mysql := persistence.NewMySqlConnection()
	mysql.InitMigration()
	defer mysql.Close()
}

func main() {
	auth := middleware.SetAuthentication()
	err := auth.MiddlewareInit()
	if err != nil {
		panic(err.Error())
	}

	sentry := middleware.SetSentry()

	router := middleware.SetupRouter(auth, sentry)
	cors := middleware.SetCors()
	router.Use(cors)

	router.Run()
}
