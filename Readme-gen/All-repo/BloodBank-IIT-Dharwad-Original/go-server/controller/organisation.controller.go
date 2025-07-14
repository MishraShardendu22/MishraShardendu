package controller

import (
	"context"
	"fmt"

	"github.com/MishraShardendu22/ChatBot-Implementation/database"
	"github.com/MishraShardendu22/ChatBot-Implementation/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Organisation model.Organisation

func GetOrganisationUserByID(id string) (*Organisation, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid ObjectID: %v", err)
	}

	collection := database.Client.Database("bloodbank").Collection("organisations")
	filter := bson.M{"_id": objectID}

	var organisation Organisation
	err = collection.FindOne(context.Background(), filter).Decode(&organisation)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("no admin found with id: %s", id)
		}
		return nil, fmt.Errorf("failed to find admin: %v", err)
	}

	return &organisation, nil
}
