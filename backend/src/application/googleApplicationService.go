package application

import (
	"api/src/middleware/container"
)

type googleApplicationService struct {
	container *container.DiContainer
}

func NewGoogleApplicationServie() *googleApplicationService {
	container := container.SetDiContainer()

	return &googleApplicationService{
		container: container,
	}
}

func (g *googleApplicationService) GetAccessToken(userId uint) string {
	user := g.container.UserRepository.FindByUserId(userId)
	return user.Token
}
