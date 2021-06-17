package youtube

import (
	"api/src/application"
	"api/src/domain/model/claims"
	"net/http"

	"github.com/gin-gonic/gin"
)

//Youtubeに登録しているチャンネル一覧取得
func GetSubscriptions(c *gin.Context) {
	var request GetSubscriptionsRequest
	if err := c.ShouldBindQuery(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "invalid",
		})
	}

	claims := claims.NewClaimsModel(c)

	service := application.NewYoutubeApplicationService()
	subscriptions, tags := service.GetSubscriptions(claims.UserId, request.TagId, request.PageToken)

	response := GetSubscriptionsResponse{
		NextPageToken: subscriptions.NextPageToken,
		PageInfo: PageInfoPartGetSubscriptions{
			TotalResults:   subscriptions.PageInfo.TotalResults,
			ResultsPerPage: subscriptions.PageInfo.ResultsPerPage,
		},
		Items: []ItemPartGetSubscriptions{},
	}

	for _, item := range subscriptions.Items {
		tagsPartGetSubscriptions := []TagsPartGetSubscriptions{}
		for _, tag := range tags {
			if tag.ChannelId == item.ChannelId {
				tagsPartGetSubscriptions = append(tagsPartGetSubscriptions, TagsPartGetSubscriptions{
					TagId:   tag.TagId,
					TagName: tag.TagName,
				})
			}
		}

		response.Items = append(response.Items, ItemPartGetSubscriptions{
			Title:       item.Title,
			Description: item.Description,
			ChannelId:   item.ChannelId,
			Thumbnail:   item.Thumbnail,
			Tags:        tagsPartGetSubscriptions,
		})
	}

	c.JSON(http.StatusOK, response)
}
