package repository

import (
	"api/src/infrastructure/entity"
)

type IUserRepository interface {
	FindByUserId(userId uint) entity.User
	FindByEmail(email string) entity.User
	Insert(entity.User) entity.User
	Update(entity.User)
}
