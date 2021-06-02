package persistence

import (
	"api/src/infrastructure/entity"
	"log"
	"os"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type mysqlConnection struct {
	*gorm.DB
}

func NewMySqlConnection() *mysqlConnection {
	db, err := gorm.Open(mysql.Open(os.Getenv("DATABASE_CONNECTION")),
		&gorm.Config{
			Logger: logger.New(
				log.New(os.Stdout, "\r\n", log.LstdFlags),
				logger.Config{
					SlowThreshold: time.Second,
					LogLevel:      logger.Silent,
					Colorful:      false,
				},
			),
		})

	if err != nil {
		panic(err.Error())
	}

	return &mysqlConnection{
		db,
	}
}

func (mysql *mysqlConnection) InitMigration() {
	err := mysql.AutoMigrate(&entity.User{}, &entity.Tag{}, &entity.ChannelMap{})
	if err != nil {
		panic(err.Error())
	}
}
