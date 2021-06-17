package middleware

import (
	authController "api/src/controllers/auth"
	googleController "api/src/controllers/google"
	tagController "api/src/controllers/tag"
	youtubeController "api/src/controllers/youtube"
	"net/http"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

func SetupRouter(jwt *jwt.GinJWTMiddleware) *gin.Engine {

	router := gin.Default()
	router.NoRoute(func(c *gin.Context) {
		c.String(http.StatusBadRequest, "")
	})

	v1 := router.Group("/v1")
	{
		v1.GET("/socialLogin", authController.GetSocialLoginURL)
		v1.POST("/callback", jwt.LoginHandler)

		auth := v1.Group("/auth")
		{
			auth.GET("/refresh", jwt.RefreshHandler)
			auth.Use(jwt.MiddlewareFunc())
			{
				auth.POST("/socialLogout", jwt.LogoutHandler)

				google := auth.Group("/google")
				{
					google.GET("/accessToken", googleController.GetAccessToken)
				}
				tag := auth.Group("/tags")
				{
					tag.GET("", tagController.GetTags)
					tag.POST("", tagController.UpdateTag)
					tag.POST("/delete", tagController.DeleteTag)
					tag.GET("/detail", tagController.GetTagDetail)
					tag.GET("/list", tagController.GetTagList)
					tag.GET("/channel", tagController.GetChannel)
					tag.POST("/channel/add", tagController.AddChannel)
					tag.POST("/channel/delete", tagController.DeleteChannel)
				}
				youtube := auth.Group("/youtube")
				{
					youtube.GET("/subscriptions", youtubeController.GetSubscriptions)
				}
			}
		}
	}

	return router
}
