package middleware

import (
	"api/src/controllers/auth"
	"encoding/json"
	"os"
	"reflect"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

func SetAuthentication() *jwt.GinJWTMiddleware {

	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "Asia/Tokyo",
		Key:         []byte(os.Getenv("AUTHENTICATION_SECRET")),
		Timeout:     time.Hour * 24,
		MaxRefresh:  time.Hour * 24,
		IdentityKey: reflect.TypeOf(auth.SocialLoginResponse{}.UserId).String(),
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if u, ok := data.(*auth.SocialLoginResponse); ok {
				return jwt.MapClaims{
					"UserId":    u.UserId,
					"FirstName": u.FirstName,
					"LastName":  u.LastName,
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			jsonStr, _ := json.Marshal(claims)

			var res auth.SocialLoginResponse
			if err := json.Unmarshal(jsonStr, &res); err != nil {
				panic(err)
			}

			return res
		},
		Authenticator: auth.SocialLogin,
		Authorizator:  auth.Authorization,
	})

	if err != nil {
		panic(err.Error())
	}

	return authMiddleware
}
