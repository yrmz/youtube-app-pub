package persistence

import (
	"api/src/infrastructure/entity"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type userPersistence struct {
	db *gorm.DB
}

func NewUserPersistence(mysql *mysqlConnection) *userPersistence {
	return &userPersistence{
		db: mysql.gorm,
	}
}

func (u *userPersistence) FindByUserId(userId uint) entity.User {
	var user entity.User
	u.db.First(&user, entity.User{UserID: userId})
	return user
}

func (u *userPersistence) FindByEmail(email string) entity.User {
	var user entity.User
	u.db.First(&user, entity.User{Email: email})
	return user
}

func (u *userPersistence) Insert(user entity.User) entity.User {
	u.db.Clauses(clause.OnConflict{UpdateAll: true}).Create(&user)
	return user
}

func (u *userPersistence) Update(entity.User) {}
