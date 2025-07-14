package routes

import (
	"context"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func SetupPutRoutes(app *fiber.App, coll *mongo.Collection) {
	collection = coll
	app.Put("/api/question/:QuestionNumber", ReplaceQuestion)
}

func ReplaceQuestion(c *fiber.Ctx) error {
	questionID := c.Params("QuestionNumber")
	questionNumber, err := strconv.Atoi(questionID)
	HandleError(err)

	var question Question
	err = c.BodyParser(&question)
	HandleError(err)

	filter := bson.M{"question_number": questionNumber}
	update := bson.M{"$set": question}

	result := collection.FindOneAndUpdate(context.Background(), filter, update)
	if err := result.Err(); err != nil {
		return err
	}

	return c.Status(200).JSON(question)
}
