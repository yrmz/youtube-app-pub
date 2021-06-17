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
	gorm  *gorm.DB
	close func()
}

func NewMySqlConnection() *mysqlConnection {
	gorm, err := gorm.Open(mysql.Open(os.Getenv("DATABASE_CONNECTION")),
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

	db, _ := gorm.DB()

	return &mysqlConnection{
		gorm: gorm,
		close: func() {
			db.Close()
		},
	}
}

func (mysql *mysqlConnection) InitMigration() {
	err := mysql.gorm.AutoMigrate(&entity.User{}, &entity.Tag{}, &entity.ChannelMap{})
	if err != nil {
		panic(err.Error())
	}
}

func (mysql *mysqlConnection) Close() {
	mysql.close()
}
