package models

import (
	"github.com/kamva/mgm/v3"
)

type Blog struct {
	mgm.DefaultModel `bson:",inline"`
	Title            string `json:"title" bson:"title"`
	Excerpt          string `json:"excerpt" bson:"excerpt"`
	Content          string `json:"content" bson:"content"` // MDX
	Author           string `json:"author" bson:"author"`
	Date             string `json:"date" bson:"date"`
	Published        bool   `json:"published" bson:"published"`
}
