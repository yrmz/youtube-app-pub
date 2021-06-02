package repository

import (
	"api/src/domain/model/tag"
	"api/src/infrastructure/entity"
)

type ITagRepository interface {
	FindByTagID(tagId uint, userId uint) entity.Tag
	FindByUserId(userId uint) []entity.Tag
	FindByChannelID(channelId string, userId uint) []entity.Tag
	FindByChannelIDs(channelId []string, userId uint) []tag.ChannelMapModel
	Upsert(tag entity.Tag) entity.Tag
	Delete(tagId uint, userId uint)
}
