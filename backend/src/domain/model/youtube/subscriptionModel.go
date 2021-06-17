package youtube

import (
	"encoding/json"
	"time"
)

type SubscriptionsModel struct {
	Kind          string `json:"kind"`
	Etag          string `json:"etag"`
	NextPageToken string `json:"nextPageToken"`
	PageInfo      struct {
		TotalResults   uint `json:"totalResults"`
		ResultsPerPage uint `json:"resultsPerPage"`
	} `json:"pageInfo"`
	Items []struct {
		Kind    string `json:"kind"`
		Etag    string `json:"etag"`
		ID      string `json:"id"`
		Snippet struct {
			PublishedAt time.Time `json:"publishedAt"`
			Title       string    `json:"title"`
			Description string    `json:"description"`
			ResourceID  struct {
				Kind      string `json:"kind"`
				ChannelID string `json:"channelId"`
			} `json:"resourceId"`
			ChannelID  string `json:"channelId"`
			Thumbnails struct {
				Default struct {
					URL string `json:"url"`
				} `json:"default"`
				Medium struct {
					URL string `json:"url"`
				} `json:"medium"`
				High struct {
					URL string `json:"url"`
				} `json:"high"`
			} `json:"thumbnails"`
		} `json:"snippet"`
	} `json:"items"`
}

type SubscriptionsErrModel struct {
	Error struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
		Errors  []struct {
			Message      string `json:"message"`
			Domain       string `json:"domain"`
			Reason       string `json:"reason"`
			Location     string `json:"location"`
			LocationType string `json:"locationType"`
		} `json:"errors"`
		Status string `json:"status"`
	} `json:"error"`
}

func NewSubscriptionsModel(data []byte) (*SubscriptionsModel, error) {
	subscriptionsErr := new(SubscriptionsErrModel)
	json.Marshal(subscriptionsErr)
	if subscriptionsErr.Error.Code != 0 {
		return &SubscriptionsModel{}, nil
	}

	subscriptions := new(SubscriptionsModel)
	err := json.Unmarshal(data, subscriptions)
	if err != nil {
		return nil, err
	}

	return subscriptions, nil
}
