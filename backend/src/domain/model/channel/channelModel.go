package channel

import (
	"github.com/go-playground/validator/v10"
)

type ChannelModel struct {
	ChannelId string `validate:"required"`
}

func NewChannelModel(channelId string) *ChannelModel {
	model := &ChannelModel{
		ChannelId: channelId,
	}

	validate := validator.New()
	errors := validate.Struct(model)
	if errors != nil {
		panic(errors.Error())
	}

	return model
}
