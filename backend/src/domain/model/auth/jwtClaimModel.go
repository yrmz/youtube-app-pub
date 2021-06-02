package auth

type JwtClaimModel struct {
	UserId    uint
	FirstName string
	LastName  string
}

func NewJwtClaimModel(userId uint, firstName string, lastName string) *JwtClaimModel {
	return &JwtClaimModel{
		UserId:    userId,
		FirstName: firstName,
		LastName:  lastName,
	}
}
