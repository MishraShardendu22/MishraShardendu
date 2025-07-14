package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ConnectToDataBase() *mongo.Collection {
	fmt.Println("Trying To Connect To The Database !!")

	mongoURI := os.Getenv("MONGO_URI")
	if mongoURI == "" {
		log.Fatal("MONGO_URI is not set. Set the Database URI to connect.")
	}
	clientOption := options.Client().ApplyURI(mongoURI)

	client, err := mongo.Connect(context.Background(), clientOption)
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}

	// Ping the database to verify the connection
	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal("Error pinging the database: ", err)
	}

	// Return the connection to the desired collection
	fmt.Println("Connected to the Database !!")
	return client.Database("DrStone").Collection("DrStone")
}
