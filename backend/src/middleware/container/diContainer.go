package container

import (
	"api/src/domain/repository"
	"api/src/infrastructure/persistence"
	"api/src/infrastructure/proxy"
)

type DiContainer struct {
	UserRepository       repository.IUserRepository
	TagRepository        repository.ITagRepository
	ChannelMapRepository repository.IChannelMapRepository
	GoogleProxy          proxy.IGoogleProxy
}

func SetDiContainer() *DiContainer {
	return &DiContainer{
		UserRepository:       persistence.NewUserRepository(),
		TagRepository:        persistence.NewTagRepository(),
		ChannelMapRepository: persistence.NewChannelMap(),
		GoogleProxy:          proxy.NewGoogleProxy(""),
	}
}
