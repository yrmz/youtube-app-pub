package youtube

type GetSubscriptionsResponse struct {
	NextPageToken string                       `json:"nextPageToken"`
	PageInfo      PageInfoPartGetSubscriptions `json:"pageInfo"`
	Items         []ItemPartGetSubscriptions   `json:"items"`
}

type PageInfoPartGetSubscriptions struct {
	TotalResults   uint `json:"totalResults"`
	ResultsPerPage uint `json:"resultsPerPage"`
}

type ItemPartGetSubscriptions struct {
	Title       string                     `json:"title"`
	Description string                     `json:"description"`
	ChannelId   string                     `json:"channelId"`
	Thumbnail   string                     `json:"thumbnail"`
	Tags        []TagsPartGetSubscriptions `json:"tags"`
}

type TagsPartGetSubscriptions struct {
	TagId   uint   `json:"tagId"`
	TagName string `json:"tagName"`
}
