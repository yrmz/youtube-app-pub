package persistence

import (
	"api/src/infrastructure/entity"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type channelMapPersistence struct {
	db *gorm.DB
}

func NewChannelMap(mysql *mysqlConnection) *channelMapPersistence {

	return &channelMapPersistence{
		db: mysql.gorm,
	}
}

func (c *channelMapPersistence) Find(channelId string, tagId uint) []entity.ChannelMap {
	var channelMaps []entity.ChannelMap
	c.db.Find(&channelMaps, entity.ChannelMap{ChannelID: channelId, TagID: tagId})
	return channelMaps
}

func (c *channelMapPersistence) FindOne(channelId string, tagId uint) entity.ChannelMap {
	var channelMap entity.ChannelMap
	c.db.First(&channelMap, entity.ChannelMap{ChannelID: channelId, TagID: tagId})
	return channelMap
}

func (c *channelMapPersistence) FindByTagID(tagId uint) []entity.ChannelMap {
	var channelMaps []entity.ChannelMap
	c.db.Find(&channelMaps, entity.ChannelMap{TagID: tagId})
	return channelMaps
}

func (c *channelMapPersistence) Upsert(channelMap entity.ChannelMap) entity.ChannelMap {
	columns := []clause.Column{{Name: "channel_id"}, {Name: "tag_id"}}
	c.db.Clauses(clause.OnConflict{Columns: columns, DoUpdates: clause.AssignmentColumns([]string{"deleted_at"})}).Create(&channelMap)
	return channelMap
}

func (c *channelMapPersistence) Delete(channelId string, tagId uint) {
	channelMaps := c.Find(channelId, tagId)

	c.db.Delete(&channelMaps)
}
