package tag

type GetTagsResponse struct {
	ChannelId string                   `json:"channelId"`
	Tags      []TagPartGetTagsResponse `json:"tags"`
}

type TagPartGetTagsResponse struct {
	TagId   uint   `json:"tagId"`
	TagName string `json:"tagName"`
}

type GetTagListResponse struct {
	TagId       uint   `json:"tagId"`
	TagName     string `json:"tagName"`
	Description string `json:"discription"`
}

type GetTagDetailResponse struct {
	TagId       uint   `json:"tagId"`
	TagName     string `json:"tagName"`
	Description string `json:"description"`
}

type GetChannelResponse struct {
	ChannelIds []string `json:"channelIds"`
}
