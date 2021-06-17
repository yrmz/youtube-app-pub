package youtube

type GetSubscriptionsRequest struct {
	PageToken string `form:"pageToken"`
	TagId     uint   `form:"tagId"`
}
