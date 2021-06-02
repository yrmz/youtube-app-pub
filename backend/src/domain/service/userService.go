package service

import (
	"api/src/domain/repository"
)

type userService struct {
	userRepository repository.IUserRepository
}

func NewUserService(userRepository repository.IUserRepository) *userService {
	return &userService{userRepository: userRepository}
}

func (u *userService) ExistsEmail(email string) bool {

	user := u.userRepository.FindByEmail(email)
	return &user != nil
}
