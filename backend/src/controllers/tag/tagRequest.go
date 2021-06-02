package tag

type GetTagsRequest struct {
	ChannelId string `form:"channelId" binding:"required"`
}

type GetTagDetailRequest struct {
	TagId uint `form:"tagId" binding:"required"`
}

type UpdateTagRequest struct {
	TagId       uint   `json:"tagId"`
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"max=255"`
}

type DeleteTagRequest struct {
	TagId uint `json:"tagId" binding:"required"`
}

type GetChannelRequest struct {
	TagId uint `form:"tagId" binding:"required"`
}

type AddChannelRequest struct {
	ChannelId string `json:"channelId" binding:"required"`
	TagId     uint   `json:"tagID" binding:"required"`
}

type DeleteChannelRequest struct {
	ChannelId string `json:"channelId" binding:"required"`
	TagId     uint   `json:"tagID" binding:"required"`
}
