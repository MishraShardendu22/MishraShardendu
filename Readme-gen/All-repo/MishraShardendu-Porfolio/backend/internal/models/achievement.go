package models

import (
	"github.com/kamva/mgm/v3"
)

type Achievement struct {
	mgm.DefaultModel `bson:",inline"`
	Title            string   `json:"title" bson:"title"`
	Description      string   `json:"description" bson:"description"`
	Images           []string `json:"images" bson:"images"` // URLs
}
