package tag

import (
	"api/src/application"
	"api/src/domain/model/claims"
	"api/src/domain/model/tag"
	"net/http"
	"strings"

	golinq "github.com/ahmetb/go-linq/v3"
	"github.com/gin-gonic/gin"
)

// チャンネルIDからタグ取得
func GetTags(c *gin.Context) {
	var request GetTagsRequest
	if err := c.ShouldBindQuery(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "accessToken is not found",
		})
		return
	}
	claims := claims.NewClaimsModel(c)

	channelIds := strings.Split(request.ChannelId, ",")
	tagApplicationService := application.NewTagApplicationService()
	channelTags, _ := tagApplicationService.GetTags(channelIds, claims.UserId)

	var groups []golinq.Group
	golinq.From(channelTags).GroupByT(
		func(c tag.ChannelMapModel) string { return c.ChannelId },
		func(c tag.ChannelMapModel) TagPartGetTagsResponse {
			return TagPartGetTagsResponse{
				TagId:   c.TagId,
				TagName: c.TagName,
			}
		},
	).ToSlice(&groups)

	var response []GetTagsResponse
	for _, group := range groups {
		var tagsResponse GetTagsResponse
		tagsResponse.ChannelId = group.Key.(string)
		for _, value := range group.Group {
			tagsResponse.Tags = append(tagsResponse.Tags, value.(TagPartGetTagsResponse))
		}
		response = append(response, tagsResponse)
	}

	c.JSON(http.StatusOK, response)
}

// タグの一覧取得
func GetTagList(c *gin.Context) {
	claims := claims.NewClaimsModel(c)

	tagApplicationService := application.NewTagApplicationService()
	tags := tagApplicationService.GetTagList(claims.UserId)

	response := []GetTagDetailResponse{}
	for _, tag := range tags {
		response = append(response, GetTagDetailResponse{
			TagId:       tag.Id,
			TagName:     tag.Name,
			Description: tag.Description,
		})
	}

	c.JSON(http.StatusOK, response)
}

// タグの詳細取得
func GetTagDetail(c *gin.Context) {
	var request GetTagDetailRequest
	if err := c.ShouldBindQuery(&request); err != nil {
		c.JSON(http.StatusOK, gin.H{
			"message": "params is invalid",
		})
		return
	}
	claims := claims.NewClaimsModel(c)

	tagApplicationService := application.NewTagApplicationService()
	tag := tagApplicationService.GetTageDetail(request.TagId, claims.UserId)

	response := GetTagDetailResponse{
		TagId:       tag.Id,
		TagName:     tag.Name,
		Description: tag.Description,
	}

	c.JSON(http.StatusOK, response)
}

//タグ追加or更新
func UpdateTag(c *gin.Context) {
	var request UpdateTagRequest
	if err := c.ShouldBind(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "params is invalid",
		})
		return
	}
	claims := claims.NewClaimsModel(c)

	tagApplicationService := application.NewTagApplicationService()
	tagApplicationService.UpdateTag(request.TagId, claims.UserId, request.Name, request.Description)

	c.JSON(http.StatusOK, gin.H{})
}

//タグ削除
func DeleteTag(c *gin.Context) {
	var request DeleteTagRequest
	if err := c.ShouldBind(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "params is invalid",
		})
		return
	}
	claims := claims.NewClaimsModel(c)

	tagApplicationService := application.NewTagApplicationService()
	tagApplicationService.DeleteTag(request.TagId, claims.UserId)

	c.JSON(http.StatusOK, gin.H{})
}

//タグ別にチャンネル取得
func GetChannel(c *gin.Context) {
	var request GetChannelRequest
	if err := c.ShouldBind(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "params is invalid",
		})
		return
	}

	claims := claims.NewClaimsModel(c)
	tagApplicationService := application.NewTagApplicationService()
	channels, err := tagApplicationService.GetChannel(request.TagId, claims.UserId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	var response GetChannelResponse
	for _, channel := range channels {
		response.ChannelIds = append(response.ChannelIds, channel.ChannelId)
	}

	c.JSON(http.StatusOK, response)
}

//タグにチャンネル追加
func AddChannel(c *gin.Context) {
	var request AddChannelRequest
	if err := c.ShouldBind(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "params is invalid",
		})
		return
	}
	claims := claims.NewClaimsModel(c)

	tagApplicationService := application.NewTagApplicationService()
	err := tagApplicationService.AddChannel(request.ChannelId, request.TagId, claims.UserId)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
	}

	c.JSON(http.StatusOK, gin.H{})
}

//タグからチャンネル削除
func DeleteChannel(c *gin.Context) {
	var request DeleteChannelRequest
	if err := c.ShouldBind(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "params is invalid",
		})
		return
	}
	claims := claims.NewClaimsModel(c)

	tagApplicationService := application.NewTagApplicationService()
	tagApplicationService.DeleteChannel(request.ChannelId, request.TagId, claims.UserId)

	c.JSON(http.StatusOK, gin.H{})
}
