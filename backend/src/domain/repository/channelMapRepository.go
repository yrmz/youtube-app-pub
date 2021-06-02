package repository

import (
	"api/src/infrastructure/entity"
)

type IChannelMapRepository interface {
	Find(channelId string, tagId uint) []entity.ChannelMap
	FindOne(channelId string, tagId uint) entity.ChannelMap
	FindByTagID(tagId uint) []entity.ChannelMap
	Upsert(channelMap entity.ChannelMap) entity.ChannelMap
	Delete(channelId string, tagId uint)
}
