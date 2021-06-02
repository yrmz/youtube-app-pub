package entity

//TagID,UserID,ChannnelIDでPrimary Keyにする
type Tag struct {
	TagID       uint   `gorm:"primaryKey;unique;autoIncrement:1"`
	UserID      uint   `gorm:"primaryKey;"`
	Name        string `gorm:"size:255;not null;"`
	Description string `gorm:"size:255;not null;"`
	Common
	ChannnelMap ChannelMap `gorm:"foreignKey:TagID;references:TagID;"`
}
