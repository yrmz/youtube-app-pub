package persistence

import (
	"api/src/domain/model/tag"
	"api/src/infrastructure/entity"
	"regexp"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type tagPersistence struct {
	db *gorm.DB
}

func NewTagPersistence(mysql *mysqlConnection) *tagPersistence {
	return &tagPersistence{
		db: mysql.gorm,
	}
}

func (t *tagPersistence) FindByTagID(tagId uint, userId uint) entity.Tag {
	var tag entity.Tag
	t.db.First(&tag, entity.Tag{TagID: tagId, UserID: userId})
	return tag
}

func (t *tagPersistence) FindByUserId(userId uint) []entity.Tag {
	var tags []entity.Tag
	t.db.Find(&tags, entity.Tag{UserID: userId})
	return tags
}

func (t *tagPersistence) FindByChannelID(channelId string, userId uint) []entity.Tag {
	var tags []entity.Tag

	r := regexp.MustCompile("^[0-9A-z]+$")
	if !r.MatchString(channelId) {
		panic("ChannelID is invalided")
	}

	t.db.Raw(`
	select t.*
	from tags t
	JOIN channel_maps cm ON t.tag_id=cm.tag_id
	where 
	t.user_id=?
	AND t.deleted_at IS NULL
	AND cm.channel_id=?
	AND cm.deleted_at IS NULL;
	`, userId, channelId).Scan(&tags)

	return tags
}

func (t *tagPersistence) FindByChannelIDs(channelIds []string, userId uint) []tag.ChannelMapModel {
	var channelMaps []tag.ChannelMapModel

	t.db.Model(&entity.Tag{}).Select("tags.tag_id,tags.name as tag_name,channel_maps.channel_id").Joins("JOIN channel_maps ON tags.tag_id=channel_maps.tag_id").Where("tags.user_id=? AND channel_maps.channel_id IN ? AND channel_maps.deleted_at IS NULL", userId, channelIds).Find(&channelMaps)

	return channelMaps
}

func (t *tagPersistence) Upsert(tag entity.Tag) entity.Tag {
	columns := []clause.Column{{Name: "tag_id"}, {Name: "user_id"}}
	t.db.Clauses(clause.OnConflict{Columns: columns, UpdateAll: true}).Create(&tag)

	return tag
}

func (t *tagPersistence) Delete(tagId uint, userId uint) {
	t.db.Delete(&entity.Tag{}, entity.Tag{TagID: tagId, UserID: userId})
}
