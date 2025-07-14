package database

import (
	"fmt"

	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectDatabase(DbName string, mongoUri string) error {
	fmt.Println("Connecting to the database...")
	err := mgm.SetDefaultConfig(nil, DbName, options.Client().ApplyURI(mongoUri))
	if err != nil {
		return fmt.Errorf("failed to connect to database: %w", err)
	}
	fmt.Println("Connected to the database successfully")
	return nil
}
