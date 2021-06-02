package proxy

import (
	"golang.org/x/oauth2"
	oauth2V2 "google.golang.org/api/oauth2/v2"
)

type IGoogleProxy interface {
	GetAuthCodeUrl() string
	GetAccessToken(code string, state string, redirectUrl string) (*oauth2.Token, error)
	GetUserInfo(token *oauth2.Token) (*oauth2V2.Userinfo, error)
}
