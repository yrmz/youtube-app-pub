package application

import (
	"api/src/domain/model/auth"
	"api/src/domain/repository"
	"api/src/infrastructure/entity"
	"api/src/infrastructure/persistence"
	"api/src/infrastructure/proxy"

	"golang.org/x/oauth2"
)

type authApplicationServie struct {
	UserRepository repository.IUserRepository
	GoogleProxy    proxy.IGoogleProxy
	ConnClose      func()
}

func NewAuthApplicaionService() *authApplicationServie {
	mysql := persistence.NewMySqlConnection()
	return &authApplicationServie{
		UserRepository: persistence.NewUserPersistence(mysql),
		GoogleProxy:    proxy.NewGoogleProxy(""),
		ConnClose:      mysql.Close,
	}
}

func (a *authApplicationServie) GetSocialLoginURL(redirectUrl string) string {
	return proxy.NewGoogleProxy(redirectUrl).GetAuthCodeUrl()
}

func (a *authApplicationServie) SocialLogin(code string, state string, redirectUrl string) (*auth.JwtClaimModel, error) {

	googleProxy := proxy.NewGoogleProxy(redirectUrl)
	accessToken, err := googleProxy.GetAccessToken(code, state, redirectUrl)
	if err != nil {
		return nil, err
	}

	//アカウント情報取得
	userInfo, err := googleProxy.GetUserInfo(accessToken)
	if err != nil {
		return nil, err
	}

	//ユーザーが存在しなければ登録を行う
	newUser := a.UserRepository.Insert(entity.User{
		FirstName: userInfo.GivenName,
		LastName:  userInfo.FamilyName,
		Token:     accessToken.AccessToken,
	})
	defer a.ConnClose()

	return auth.NewJwtClaimModel(newUser.UserID, newUser.FirstName, newUser.LastName), nil
}

//認可
func (a *authApplicationServie) Authorization(userId uint) bool {
	//DBからId検索
	user := a.UserRepository.FindByUserId(userId)
	if &user == nil {
		return false
	}

	defer a.ConnClose()

	//GoogleToken検証
	token := &oauth2.Token{
		AccessToken: user.Token,
	}
	_, err := a.GoogleProxy.GetUserInfo(token)
	isSuccess := err == nil

	return isSuccess
}
