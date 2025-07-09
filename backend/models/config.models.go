package models

import "github.com/kamva/mgm/v3"

type Config struct {
	Port             string
	Environment      string
	CorsAllowOrigins string
	LogLevel         string
	MONGODB_URI      string
	DbName           string
	AdminPass        string
	JWT_SECRET       string
}

type TestModel struct {
	mgm.DefaultModel `bson:",inline"`
	Name             string `bson:"name"`
	Msg              string `bson:"msg"`
}
