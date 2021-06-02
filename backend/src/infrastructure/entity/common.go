package entity

import (
	"time"

	"gorm.io/gorm"
)

type Common struct {
	DeletedAt gorm.DeletedAt `gorm:"index;"`
	CreatedAt time.Time      `gorm:"autoCreateTime;not null;"`
	UpdatedAt time.Time      `gorm:"autoUpdateTime:milli;not null;"`
}
