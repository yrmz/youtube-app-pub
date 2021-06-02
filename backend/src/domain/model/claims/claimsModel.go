package claims

import (
	"api/src/controllers/auth"
	"encoding/json"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-gonic/gin"
)

type claimsModel struct {
	auth.AuthorizationRequest
}

func NewClaimsModel(c *gin.Context) *claimsModel {
	jsonStr, _ := json.Marshal(jwt.ExtractClaims(c))
	var claims auth.AuthorizationRequest
	json.Unmarshal(jsonStr, &claims)

	return &claimsModel{claims}
}
