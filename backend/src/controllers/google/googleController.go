package google

import (
	"api/src/application"
	"api/src/controllers/auth"
	"encoding/json"
	"net/http"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

//Googleのアクセストークン取得
func GetAccessToken(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	jsonStr, _ := json.Marshal(claims)

	var res auth.SocialLoginResponse
	if err := json.Unmarshal(jsonStr, &res); err != nil {
		panic(err)
	}

	googleApplicationService := application.NewGoogleApplicationServie()
	accessToken := googleApplicationService.GetAccessToken(res.UserId)
	if len(accessToken) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "accessToken is not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"accessToken": accessToken,
	})
}
