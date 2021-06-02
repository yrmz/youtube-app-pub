package tag

type ChannelMapModel struct {
	ChannelId string
	TagId     uint
	TagName   string
}

func NewChannelMapModel(channelId string, tagId uint, tagName string) *ChannelMapModel {
	return &ChannelMapModel{
		ChannelId: channelId,
		TagId:     tagId,
		TagName:   tagName,
	}
}
