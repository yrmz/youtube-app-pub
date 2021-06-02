package auth

type GetSocialLoginURLRequest struct {
	RedirectUrl string `form:"redirectUrl" binding:"required"`
}

type SocialLoginRequest struct {
	Code        string `form:"code" json:"code" binding:"required"`
	State       string `form:"state" json:"state" binding:"required"`
	RedirectUrl string `form:"redirectUrl" json:"redirectUrl" binding:"required"`
}

type AuthorizationRequest struct {
	UserId    uint
	FirstName string
	LastName  string
}
