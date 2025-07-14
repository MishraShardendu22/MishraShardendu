package models

import (
	"github.com/kamva/mgm/v3"
)

type OSSContribution struct {
	mgm.DefaultModel `bson:",inline"`
	Repo             string `json:"repo" bson:"repo"`
	Description      string `json:"description" bson:"description"`
}
