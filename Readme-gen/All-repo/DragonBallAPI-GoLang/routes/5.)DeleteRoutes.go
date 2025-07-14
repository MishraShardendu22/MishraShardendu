package routes

import (
	"context"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func SetupDeleteRoutes(app *fiber.App, coll *mongo.Collection) {
	collection = coll
	app.Delete("/api/question/:QuestionNumber", DeleteQuestion)
	app.Delete("/api/delete_all", DeleteAll)
}

func DeleteQuestion(c *fiber.Ctx) error {
	id := c.Params("QuestionNumber")
	questionNumber, err := strconv.Atoi(id)
	HandleError(err)

	_, err = collection.DeleteOne(context.Background(), bson.M{"question_number": questionNumber})
	HandleError(err)

	return c.Status(200).JSON(fiber.Map{"message": "Question was deleted"})
}

func DeleteAll(c *fiber.Ctx) error {
	result, err := collection.DeleteMany(context.Background(), bson.M{})
	HandleError(err)

	return c.Status(200).JSON(fiber.Map{
		"message":      "All questions were deleted",
		"deletedCount": result.DeletedCount,
	})
}
