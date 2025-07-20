package util

import (
	"time"

	"github.com/golang-jwt/jwt"
)

func GenerateJWT(userId string, email string,secret string) (string, error) {
	claims := jwt.MapClaims{
		"id":    userId,
		"email": email,
		"exp":   time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}
