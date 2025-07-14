package models

import (
	"github.com/kamva/mgm/v3"
)

type Experience struct {
	mgm.DefaultModel `bson:",inline"`
	Company          string   `json:"company" bson:"company"`
	Role             string   `json:"role" bson:"role"`
	Duration         string   `json:"duration" bson:"duration"`
	Bullets          []string `json:"bullets" bson:"bullets"`
	Projects         []string `json:"projects" bson:"projects"` // project IDs
}
