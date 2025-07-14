package models

import (
	"github.com/kamva/mgm/v3"
)

type Project struct {
	mgm.DefaultModel `bson:",inline"`
	Title            string   `json:"title" bson:"title"`
	Description      string   `json:"description" bson:"description"`
	GitHubURL        string   `json:"githubUrl" bson:"githubUrl"`
	TechStack        []string `json:"techStack" bson:"techStack"`
	Role             string   `json:"role" bson:"role"`
	DemoURL          string   `json:"demoUrl" bson:"demoUrl"`
	Image            string   `json:"image" bson:"image"`
	Featured         bool     `json:"featured" bson:"featured"`
	Category         string   `json:"category" bson:"category"`
}
