package auth

import (
	"api/src/application"
	"fmt"
	"net/http"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

//OAuth2のURL取得
func GetSocialLoginURL(c *gin.Context) {
	var request GetSocialLoginURLRequest
	if c.ShouldBindQuery(&request) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "params is invalid",
		})
		return
	}
	authApplicationService := application.NewAuthApplicaionService()

	url := authApplicationService.GetSocialLoginURL(request.RedirectUrl)

	c.JSON(http.StatusOK,
		GetSocialLoginURLResponse{
			Url: url,
		})
}

//SNSログイン
func SocialLogin(c *gin.Context) (interface{}, error) {

	var request SocialLoginRequest
	if err := c.ShouldBind(&request); err != nil {
		return &SocialLoginResponse{}, jwt.ErrFailedAuthentication
	}

	authApplicationServie := application.NewAuthApplicaionService()
	jwtClaim, err := authApplicationServie.SocialLogin(request.Code, request.State, request.RedirectUrl)
	if err != nil {
		return &SocialLoginResponse{}, jwt.ErrFailedAuthentication
	}

	return &SocialLoginResponse{
		UserId:    jwtClaim.UserId,
		FirstName: jwtClaim.FirstName,
		LastName:  jwtClaim.LastName,
	}, nil
}

//認可
func Authorization(data interface{}, c *gin.Context) bool {
	request, ok := data.(SocialLoginResponse)
	if !ok {
		fmt.Println("UnAuthorize")
		return false
	}

	authApplicationServie := application.NewAuthApplicaionService()
	result := authApplicationServie.Authorization(request.UserId)
	return result
}
