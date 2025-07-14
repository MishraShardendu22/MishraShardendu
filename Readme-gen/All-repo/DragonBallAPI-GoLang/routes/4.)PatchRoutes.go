package routes

import (
	"context"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func SetupPatchRoutes(app *fiber.App, coll *mongo.Collection) {
	collection = coll
	app.Patch("/api/question/:QuestionNumber", UpdateQuestion) // Update the handler function name
}

func UpdateQuestion(c *fiber.Ctx) error {
	questionNumberStr := c.Params("QuestionNumber")
	questionNumber, err := strconv.Atoi(questionNumberStr) // Convert to integer
	HandleError(err)

	var updateData map[string]interface{}
	err = c.BodyParser(&updateData)
	HandleError(err)

	filter := bson.M{"question_number": questionNumber}
	update := bson.M{"$set": updateData}

	_, err = collection.UpdateOne(context.Background(), filter, update)
	HandleError(err)

	return c.JSON(fiber.Map{"message": "Question was updated"})
}