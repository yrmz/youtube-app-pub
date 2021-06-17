package application

import (
	"api/src/domain/model/channel"
	"api/src/domain/model/tag"
	"api/src/domain/repository"
	"api/src/infrastructure/entity"
	"api/src/infrastructure/persistence"
	"errors"
)

type tagApplicationService struct {
	TagRepository        repository.ITagRepository
	ChannelMapRepository repository.IChannelMapRepository
	ConnClose            func()
}

func NewTagApplicationService() *tagApplicationService {
	mysql := persistence.NewMySqlConnection()

	return &tagApplicationService{
		TagRepository:        persistence.NewTagPersistence(mysql),
		ChannelMapRepository: persistence.NewChannelMap(mysql),
		ConnClose:            mysql.Close,
	}
}

// チャンネルIDからタグ取得
func (t *tagApplicationService) GetTags(channelIds []string, userId uint) ([]tag.ChannelMapModel, error) {
	newChannelMaps := t.TagRepository.FindByChannelIDs(channelIds, userId)

	return newChannelMaps, nil
}

// タグの一覧取得
func (t *tagApplicationService) GetTagList(userId uint) []*tag.TagModel {
	newTags := t.TagRepository.FindByUserId(userId)

	var tags []*tag.TagModel
	for _, newTag := range newTags {
		tag := tag.NewTagModel(newTag.TagID, newTag.UserID, newTag.Name, newTag.Description)
		tags = append(tags, tag)
	}

	return tags
}

//タグの詳細取得
func (t *tagApplicationService) GetTageDetail(tageId uint, userId uint) *tag.TagModel {
	newtag := t.TagRepository.FindByTagID(tageId, userId)
	return tag.NewTagModel(newtag.TagID, newtag.UserID, newtag.Name, newtag.Description)
}

//タグ追加
func (t *tagApplicationService) UpdateTag(tagId uint, userId uint, name string, description string) {
	t.TagRepository.Upsert(entity.Tag{
		TagID:       tagId,
		UserID:      userId,
		Name:        name,
		Description: description,
	})
}

//タグ削除
func (t *tagApplicationService) DeleteTag(tagId uint, userId uint) {
	t.TagRepository.Delete(tagId, userId)
}

//タグ別にチャンネル取得
func (t *tagApplicationService) GetChannel(tagId uint, userId uint) ([]*channel.ChannelModel, error) {
	tags := t.TagRepository.FindByTagID(tagId, userId)
	if &tags == nil {
		return []*channel.ChannelModel{}, errors.New("tag is not found")
	}

	channelMaps := t.ChannelMapRepository.FindByTagID(tagId)

	var channelModels []*channel.ChannelModel
	for _, channelMap := range channelMaps {
		channelModels = append(channelModels, channel.NewChannelModel(channelMap.ChannelID))
	}

	return channelModels, nil
}

//タグにチャンネル追加
func (t *tagApplicationService) AddChannel(channelId string, tagId uint, userId uint) error {
	tags := t.TagRepository.FindByTagID(tagId, userId)
	if &tags == nil {
		return errors.New("tag is not found")
	}

	t.ChannelMapRepository.Upsert(
		entity.ChannelMap{
			TagID:     tagId,
			ChannelID: channelId,
		})

	return nil
}

//タグからチャンネル削除
func (t *tagApplicationService) DeleteChannel(channelId string, tagId uint, userId uint) error {
	tags := t.TagRepository.FindByTagID(tagId, userId)
	if &tags == nil {
		return errors.New("tag is not exists")
	}

	t.ChannelMapRepository.Delete(channelId, tagId)
	return nil
}
