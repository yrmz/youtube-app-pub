package user

import "github.com/go-playground/validator/v10"

type User struct {
	Id        string
	LastName  string
	FirstName string
	Email     string `validate:"required,email"`
	Token     string `validate:"required"`
}

func NewUser(lastName string, firstName string, email string, token string) *User {
	user := new(User)
	user.LastName = lastName
	user.FirstName = firstName
	user.Email = email
	user.Token = token

	validate := validator.New()
	errors := validate.Struct(user)
	if errors != nil {
		panic(errors.Error())
	}

	return user
}
