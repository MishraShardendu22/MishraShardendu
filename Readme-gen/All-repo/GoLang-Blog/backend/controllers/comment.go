package controllers

import (
	"github.com/MishraShardendu22/schema"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func MakeComment(c *fiber.Ctx, collections *mongo.Collection) error {
	var comments schema.Comment
	if err := c.BodyParser(&comments); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid JSON format"})
	}
	_, err := collections.InsertOne(c.Context(), comments)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Failed to add comment"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Comment added successfully"})
}

func DeleteComment(c *fiber.Ctx, collections *mongo.Collection) error {
	id := c.Params("id")

	result := collections.FindOneAndDelete(c.Context(), bson.M{"_id": id})
	if result.Err() != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "Comment not found"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Comment deleted successfully"})
}

func GetComment(c *fiber.Ctx, collections *mongo.Collection) error {
	id := c.Params("id")

	result := collections.FindOne(c.Context(), bson.M{"_id": id})
	if result.Err() != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "Comment not found"})
	}

	var comment schema.Comment
	if err := result.Decode(&comment); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Failed to decode comment"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"comment": comment})
}

func EditComment(c *fiber.Ctx, collections *mongo.Collection) error {
	var comments schema.Comment
	if err := c.BodyParser(&comments); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Invalid JSON format"})
	}

	filter := bson.M{"_id": comments.ID}
	update := bson.M{"$set": comments}
	result := collections.FindOneAndUpdate(c.Context(), filter, update)

	if result.Err() != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"message": "Comment not found"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Comment updated successfully"})
}