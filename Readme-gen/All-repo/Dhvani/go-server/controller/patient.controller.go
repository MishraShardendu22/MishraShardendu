package controller

import (
	"context"
	"fmt"

	"github.com/MishraShardendu22/ChatBot-Implementation/database"
	"github.com/MishraShardendu22/ChatBot-Implementation/model"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Patient model.Patient

func GetPatientUserByID(id string) (*Patient, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid ObjectID: %v", err)
	}

	collection := database.Client.Database("bloodbank").Collection("patients")
	filter := bson.M{"_id": objectID}

	var patient Patient
	err = collection.FindOne(context.Background(), filter).Decode(&patient)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("no admin found with id: %s", id)
		}
		return nil, fmt.Errorf("failed to find admin: %v", err)
	}

	return &patient, nil
}

func PostPatientSurvey(id string, c *fiber.Ctx) error {
	var survey model.Survey
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid DonorID"})
	}
	survey.DonorID = objectID

	if err := c.BodyParser(&survey); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	collection := database.Client.Database("bloodbank").Collection("patientSurvey")
	_, err = collection.InsertOne(context.Background(), survey)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Survey added successfully",
	})
}
