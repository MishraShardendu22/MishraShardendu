package models

import "github.com/kamva/mgm/v3"

type User struct {
	mgm.DefaultModel `bson:",inline"`
	Email            string `bson:"email"`
	Password         string `bson:"password"`
	AdminPass        string `bson:"admin_pass"`
}

