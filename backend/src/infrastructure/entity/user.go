package entity

type User struct {
	UserID    uint   `gorm:"primaryKey;autoIncrement:1"`
	Email     string `gorm:"index;unique;size:255;not null"`
	LastName  string `gorm:"size:255;not null"`
	FirstName string `gorm:"size:255;not null"`
	Token     string `gorm:"size:255;not null"`
	Common
	Tag Tag `gorm:"foreignKey:UserID;references:UserID;"`
}
