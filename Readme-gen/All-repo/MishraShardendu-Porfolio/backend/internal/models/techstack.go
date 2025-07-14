package models

import (
	"github.com/kamva/mgm/v3"
)

type TechStack struct {
	mgm.DefaultModel `bson:",inline"`
	Category         string `json:"category" bson:"category"` // e.g., Languages, Frameworks, DevOps, Cloud, Tools
	Name             string `json:"name" bson:"name"`
	Icon             string `json:"icon" bson:"icon"` // URL or icon name
}
