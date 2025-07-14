package routes

import (
	"context"
	"strings"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func SetupGetRoutes(app *fiber.App, coll *mongo.Collection) {
	collection = coll
	app.Get("/api/all", GetAllQuestions)
	app.Get("/api/question/:id", GetQuestionById)
	app.Get("/api/question/difficulty/:difficulty", GetQuestionByDifficulty)
}

func GetAllQuestions(c *fiber.Ctx) error {
	var qns []Question

	cursor, err := collection.Find(c.Context(), bson.M{})
	HandleError(err)
	defer cursor.Close(context.Background())

	for cursor.Next(c.Context()) {
		var qn Question
		err := cursor.Decode(&qn)
		HandleError(err)
		qns = append(qns, qn)
	}

	return c.Status(200).JSON(qns)
}

func GetQuestionById(c *fiber.Ctx) error {
	id := c.Params("id")
	objectId, err := primitive.ObjectIDFromHex(id)
	HandleError(err)

	filter := bson.M{"_id": objectId}
	var qn Question

	err = collection.FindOne(context.Background(), filter).Decode(&qn)
	HandleError(err)

	return c.Status(200).JSON(qn)
}

func GetQuestionByDifficulty(c *fiber.Ctx) error {
	difficulty := c.Params("difficulty")
	difficulty = strings.ToLower(difficulty)

	filter := bson.M{"difficulty": difficulty}

	var qns []Question
	cursor, err := collection.Find(context.Background(), filter)
	HandleError(err)
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var qn Question
		err := cursor.Decode(&qn)
		HandleError(err)
		qns = append(qns, qn)
	}

	return c.Status(200).JSON(qns)
}