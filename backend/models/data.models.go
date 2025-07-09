package models

import "github.com/kamva/mgm/v3"

type User struct {
	mgm.DefaultModel `bson:",inline"`
	Email            string                       `bson:"email"`
	Password         string                       `bson:"password"`
	AdminPass        string                       `bson:"admin_pass"`
	Skills           []string                     `bson:"skills" json:"skills"`
	Projects         []Project                    `bson:"projects" json:"projects"`
	Experiences      []Experience                 `bson:"experiences" json:"experiences"`
	Certifications   []CertificationOrAchivements `bson:"certifications" json:"certifications"`
}

type Project struct {
	mgm.DefaultModel  `bson:",inline"`
	ProjectName       string   `bson:"project_name" json:"project_name"`
	SmallDescription  string   `bson:"small_description" json:"small_description"`
	Description       string   `bson:"description" json:"description"`
	Skills            []string `bson:"skills" json:"skills"`
	ProjectRepository string   `bson:"project_repository" json:"project_repository"`
	ProjectLiveLink   string   `bson:"project_live_link" json:"project_live_link"`
	ProjectVideo      string   `bson:"project_video" json:"project_video"`
	CreatedBy         string   `bson:"created_by" json:"created_by"`
}

type Experience struct {
	mgm.DefaultModel `bson:",inline"`
	CompanyName      string    `bson:"company_name" json:"company_name"`
	Position         string    `bson:"position" json:"position"`
	StartDate        string    `bson:"start_date" json:"start_date"`
	EndDate          string    `bson:"end_date" json:"end_date"`
	Description      string    `bson:"description" json:"description"`
	Technologies     []string  `bson:"technologies" json:"technologies"`
	CreatedBy        string    `bson:"created_by" json:"created_by"`
	Projects         []Project `bson:"projects" json:"projects"`
	CompanyLogo      string    `bson:"company_logo" json:"company_logo"`
	CertificateURL   string    `bson:"certificate_url" json:"certificate_url"`
	Images           []string  `bson:"images" json:"images"`
}

type CertificationOrAchivements struct {
	mgm.DefaultModel `bson:",inline"`
	Title            string    `bson:"title" json:"title"`
	Description      string    `bson:"description" json:"description"`
	Projects         []Project `bson:"projects" json:"projects"`
	Skills           []string  `bson:"skills" json:"skills"`
	CertificateURL   string    `bson:"certificate_url" json:"certificate_url"`
	Images           []string  `bson:"images" json:"images"`
	Issuer           string    `bson:"issuer" json:"issuer"`
	IssueDate        string    `bson:"issue_date" json:"issue_date"`
	ExpiryDate       string    `bson:"expiry_date" json:"expiry_date"`
	CreatedBy        string    `bson:"created_by" json:"created_by"`
}
