package application

import (
	"api/src/domain/repository"
	"api/src/infrastructure/persistence"
)

type googleApplicationService struct {
	UserRepository repository.IUserRepository
	ConnClose      func()
}

func NewGoogleApplicationServie() *googleApplicationService {
	mysql := persistence.NewMySqlConnection()

	return &googleApplicationService{
		UserRepository: persistence.NewUserPersistence(mysql),
		ConnClose:      mysql.Close,
	}
}

func (g *googleApplicationService) GetAccessToken(userId uint) string {
	user := g.UserRepository.FindByUserId(userId)
	defer g.ConnClose()

	return user.Token
}
