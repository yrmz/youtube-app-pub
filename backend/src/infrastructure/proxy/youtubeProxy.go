package proxy

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"os"
	"strings"
)

type youtubeProxy struct {
	url string
}

func NewYoutubeProxy() *youtubeProxy {

	return &youtubeProxy{
		url: os.Getenv("YOUTUBE_API_URL"),
	}
}

func (y youtubeProxy) GetSubscriptions(token string, pageToken string, channelIds []string) []byte {
	value := url.Values{}
	value.Add("part", "id,snippet")
	value.Add("mine", "true")
	value.Add("maxResults", "25")
	if &pageToken != nil {
		value.Add("pageToken", pageToken)
	}
	if len(channelIds) > 0 {
		forChannelId := strings.Join(channelIds, ",")
		value.Add("forChannelId", forChannelId)
	}

	url := fmt.Sprint(y.url, "?", value.Encode())
	req, _ := http.NewRequest(http.MethodGet, url, nil)
	req.Header.Set("Authorization", fmt.Sprint("Bearer ", token))

	client := new(http.Client)
	res, err := client.Do(req)
	defer res.Body.Close()
	if err != nil {
		panic(err.Error())
	}

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		panic(body)
	}

	return body
}
