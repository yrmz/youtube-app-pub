package application

import (
	"api/src/domain/model/channel"
	"api/src/domain/model/tag"
	youtubeModel "api/src/domain/model/youtube"
	"api/src/domain/repository"
	"api/src/infrastructure/persistence"
	"api/src/infrastructure/proxy"
)

type youtubeApplicationService struct {
	userRepository       repository.IUserRepository
	tagRepository        repository.ITagRepository
	channelMapRepository repository.IChannelMapRepository
	youtubeProxy         proxy.IYoutubeProxy
	connClose            func()
}

func NewYoutubeApplicationService() *youtubeApplicationService {
	mysql := persistence.NewMySqlConnection()
	return &youtubeApplicationService{
		userRepository:       persistence.NewUserPersistence(mysql),
		tagRepository:        persistence.NewTagPersistence(mysql),
		channelMapRepository: persistence.NewChannelMap(mysql),
		youtubeProxy:         proxy.NewYoutubeProxy(),
		connClose:            mysql.Close,
	}
}

func (y *youtubeApplicationService) GetSubscriptions(userId uint, tagId uint, pageToken string) (*channel.ChannelListModel, []tag.ChannelMapModel) {

	user := y.userRepository.FindByUserId(userId)
	if &user == nil {
		panic("user is not founded")
	}

	mapChannelIds := []string{}
	if tagId != 0 {
		channelMaps := y.channelMapRepository.FindByTagID(tagId)
		if len(channelMaps) == 0 {
			return &channel.ChannelListModel{}, []tag.ChannelMapModel{}
		}

		for _, channelMap := range channelMaps {
			mapChannelIds = append(mapChannelIds, channelMap.ChannelID)
		}
	}

	subscriptsions := y.youtubeProxy.GetSubscriptions(user.Token, pageToken, mapChannelIds)
	subscriptsionsModel, err := youtubeModel.NewSubscriptionsModel(subscriptsions)
	if err != nil {
		panic(err.Error())
	}

	var items []channel.ChannelListItems
	for _, item := range subscriptsionsModel.Items {
		items = append(items, channel.ChannelListItems{
			Title:       item.Snippet.Title,
			Description: item.Snippet.Description,
			ChannelId:   item.Snippet.ResourceID.ChannelID,
			Thumbnail:   item.Snippet.Thumbnails.Default.URL,
		})
	}

	channelListModel := channel.NewChannelListModel(subscriptsionsModel.NextPageToken, subscriptsionsModel.PageInfo.ResultsPerPage, subscriptsionsModel.PageInfo.ResultsPerPage, items)

	//タグ一覧取得
	var channelIds []string
	for _, item := range channelListModel.Items {
		channelIds = append(channelIds, item.ChannelId)
	}
	tags := y.tagRepository.FindByChannelIDs(channelIds, userId)

	defer y.connClose()

	return channelListModel, tags
}
