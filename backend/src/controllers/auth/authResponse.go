package auth

type GetSocialLoginURLResponse struct {
	Url string `json:"url"`
}

type SocialLoginResponse struct {
	UserId    uint
	FirstName string
	LastName  string
}
