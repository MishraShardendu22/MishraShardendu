package utils

import (
	"fmt"
	"log"

	"golang.org/x/crypto/bcrypt"
)

func HashPassWord(password string) string {
	HashPassWord, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("Error While Hashing The Password")
		log.Fatal(err)
	}
	return string(HashPassWord)
}
