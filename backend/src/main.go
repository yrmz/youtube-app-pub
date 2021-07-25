package main

import (
	"api/src/infrastructure/persistence"
	"api/src/middleware"
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
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
	router := middleware.SetupRouter(auth)
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST"},
		AllowHeaders: []string{
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"X-CSRF-Token",
			"Authorization",
		},
	}))
	router.Run()
}
