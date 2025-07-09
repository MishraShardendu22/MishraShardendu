package models

import "github.com/kamva/mgm/v3"

type User struct {
	mgm.DefaultModel `bson:",inline"`
	Email            string `bson:"email"`
	Password         string `bson:"password"`
	AdminPass        string `bson:"adminPass"`
}

type Blog struct {
	mgm.DefaultModel `bson:",inline"`
	Title            string   `bson:"title"`
	Content          string   `bson:"content"`
	Author           string   `bson:"author"`
	Published        bool     `bson:"published"`
	Tags             []string `bson:"tags"`
	Slug             string   `bson:"slug"`
	ViewCount        int      `bson:"view_count"`
}

type Likes struct {
	mgm.DefaultModel `bson:",inline"`
	Email           string `bson:"email"`
	UserID           string `bson:"user_id"`
}
