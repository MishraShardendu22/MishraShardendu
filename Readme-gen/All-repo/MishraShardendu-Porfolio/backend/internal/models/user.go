package models

import (
	"github.com/kamva/mgm/v3"
)

type User struct {
	mgm.DefaultModel `bson:",inline"`
	Email            string `json:"email" bson:"email"`
	Password         string `json:"password" bson:"password"`
	Role             string `json:"role" bson:"role"` // e.g., "admin" or "user"
}
