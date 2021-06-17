package channel

type ChannelListModel struct {
	NextPageToken string
	PageInfo      ChannelListPageInfo
	Items         []ChannelListItems
}

type ChannelListPageInfo struct {
	TotalResults   uint
	ResultsPerPage uint
}

type ChannelListItems struct {
	Title       string
	Description string
	ChannelId   string
	Thumbnail   string
}

func NewChannelListModel(nextPageToken string, totalResults uint, resultsPerPage uint, items []ChannelListItems) *ChannelListModel {
	pageInfo := ChannelListPageInfo{
		TotalResults:   totalResults,
		ResultsPerPage: resultsPerPage,
	}

	return &ChannelListModel{
		NextPageToken: nextPageToken,
		PageInfo:      pageInfo,
		Items:         items,
	}
}
