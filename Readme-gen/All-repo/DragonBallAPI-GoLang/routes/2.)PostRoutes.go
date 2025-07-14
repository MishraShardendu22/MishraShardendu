package routes

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func SetupPostRoutes(app *fiber.App, coll *mongo.Collection) {
	collection = coll
	app.Post("/api/question", AddQuestion)
}

func AddQuestion(c *fiber.Ctx) error {
	var qn Question
	err := c.BodyParser(&qn)
	HandleError(err)

	length, err := collection.CountDocuments(context.Background(), bson.M{})
	HandleError(err)
	qn.Question_Number = int(length) + 1

	// Set default values
	if qn.Rating < 0 || qn.Rating > 100 {
		qn.Rating = 50
	}
	if qn.Difficulty == "" {
		qn.Difficulty = "medium"
	}

	if len(qn.Question) == 0 {
		return c.Status(400).JSON(fiber.Map{"error": "Question field cannot be empty"})
	}
	if len(qn.Answer) == 0 {
		return c.Status(400).JSON(fiber.Map{"error": "Answer field cannot be empty"})
	}

	_, err = collection.InsertOne(context.Background(), qn)
	HandleError(err)

	return c.Status(201).JSON(fiber.Map{"message": qn})
}
