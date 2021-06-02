package tag

import (
	"github.com/go-playground/validator/v10"
)

type TagModel struct {
	Id          uint
	UserId      uint   `validate:"required"`
	Name        string `validate:"required"`
	Description string `validate:"max=255"`
}

func NewTagModel(id uint, userId uint, name string, description string) *TagModel {
	model := &TagModel{
		Id:          id,
		UserId:      userId,
		Name:        name,
		Description: description,
	}

	validate := validator.New()
	errors := validate.Struct(model)
	if errors != nil {
		panic(errors.Error())
	}

	return model
}
