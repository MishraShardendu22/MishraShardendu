package models

type Projects struct {
	ProjectName string `bson:"project_name"`
	SmallDescription string `bson:"small_description"`
	Description string `bson:"description"`
	Technologies []string `bson:"technologies"`
	ProjectRepository string `bson:"project_repository"`
	ProjectLiveLink string `bson:"project_live_link"`
	ProjectVideo string `bson:"project_video"`
}

type Experience struct {
	CompanyName string `bson:"company_name"`
	Position string `bson:"position"`
	StartDate string `bson:"start_date"`
	EndDate string `bson:"end_date"`
	Description string `bson:"description"`
	Technologies []string `bson:"technologies"`
}