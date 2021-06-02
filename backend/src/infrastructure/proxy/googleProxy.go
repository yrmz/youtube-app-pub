package proxy

import (
	"context"
	"errors"
	"os"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	oauth2V2 "google.golang.org/api/oauth2/v2"
	"google.golang.org/api/option"
)

type googleProxy struct {
	config  *oauth2.Config
	state   string
	context context.Context
}

//コンストラクタ
func NewGoogleProxy(redirectUrl string) *googleProxy {
	config := &oauth2.Config{
		ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
		ClientSecret: os.Getenv("GOOGLE_SECRET"),
		RedirectURL:  redirectUrl,
		Endpoint:     google.Endpoint,
		Scopes:       []string{"https://www.googleapis.com/auth/youtube", "https://www.googleapis.com/auth/userinfo.profile", "email"},
	}

	context := context.Background()

	return &googleProxy{
		config:  config,
		state:   os.Getenv("GOOGLE_STATE"),
		context: context,
	}
}

//認証コード取得API
func (g *googleProxy) GetAuthCodeUrl() string {
	return g.config.AuthCodeURL(g.state)
}

//認証トークン取得
func (g *googleProxy) GetAccessToken(code string, state string, redirectUrl string) (*oauth2.Token, error) {
	if state != g.state {
		return &oauth2.Token{}, errors.New("code is invalid")
	}

	token, err := g.config.Exchange(g.context, code)
	if err != nil {
		panic(err.Error())
	}

	return token, nil
}

//ユーザー情報取得
func (g *googleProxy) GetUserInfo(token *oauth2.Token) (*oauth2V2.Userinfo, error) {
	service, err := oauth2V2.NewService(g.context, option.WithTokenSource(g.config.TokenSource(g.context, token)))
	if err != nil {
		panic(err.Error())
	}

	userInfoService := oauth2V2.NewUserinfoService(service)
	userInfo, err := userInfoService.Get().Do()

	return userInfo, err
}
