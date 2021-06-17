package proxy

type IYoutubeProxy interface {
	GetSubscriptions(token string, pageToken string, channelIds []string) []byte
}
