package entity

type ChannelMap struct {
	TagID     uint   `gorm:"primaryKey"`
	ChannelID string `gorm:"primaryKey;size:255"`
	Name      string `gorm:"primaryKey;size:255"`
	Common
}
