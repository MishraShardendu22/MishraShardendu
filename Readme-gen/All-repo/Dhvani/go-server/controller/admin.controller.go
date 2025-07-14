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

type Admin model.Admin

func GetAdminUserByID(id string) (*Admin, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid ObjectID: %v", err)
	}

	collection := database.Client.Database("bloodbank").Collection("admins")
	filter := bson.M{"_id": objectID}

	var admin Admin
	err = collection.FindOne(context.Background(), filter).Decode(&admin)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("no admin found with id: %s", id)
		}
		return nil, fmt.Errorf("failed to find admin: %v", err)
	}

	return &admin, nil
}
