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
}

func main() {
	mysql := persistence.NewMySqlConnection()
	mysql.InitMigration()

	auth := middleware.SetAuthentication()
	err := auth.MiddlewareInit()
	if err != nil {
		panic(err.Error())
	}
	router := middleware.SetupRouter(auth)
	router.Run()
}
