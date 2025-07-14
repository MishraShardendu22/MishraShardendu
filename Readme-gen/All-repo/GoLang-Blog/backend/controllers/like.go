package controllers

import (
	"github.com/MishraShardendu22/schema"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"time"
)

func LikePost(c *fiber.Ctx, collections *mongo.Collection) error {
	var like schema.Like

	if err := c.BodyParser(&like); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid request body"})
	}

	like.ID = uint(time.Now().UnixNano())

	_, err := collections.InsertOne(c.Context(), like)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to like post"})
	}

	filter := bson.M{"id": like.PostID}
	update := bson.M{"$push": bson.M{"likes": like.UserID}}
	_, err = collections.UpdateOne(c.Context(), filter, update, options.Update().SetUpsert(true))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to update post with like"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Post liked successfully", "like": like})
}

func UnLikePost(c *fiber.Ctx, collections *mongo.Collection) error {
	var like schema.Like

	if err := c.BodyParser(&like); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Failed to Unlike post"})
	}

	filter := bson.M{"id": like.PostID}
	update := bson.M{"$pull": bson.M{"likes": like.UserID}}
	_, err := collections.UpdateOne(c.Context(), filter, update)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to Unlike post"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Post unliked successfully"})
}

func LikedPost(c *fiber.Ctx, collections *mongo.Collection) error {
	userId := c.Params("userId")
	if userId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid user id"})
	}

	cursor, err := collections.Find(c.Context(), bson.M{"likes": userId})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch liked posts"})
	}
	defer cursor.Close(c.Context())

	var posts []schema.Post
	if err := cursor.All(c.Context(), &posts); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to decode posts"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Liked posts fetched successfully", "data": posts})
}

func GetLikes(c *fiber.Ctx, collections *mongo.Collection) error {
	postId := c.Params("postId")
	if postId == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid post id"})
	}

	var post schema.Post
	err := collections.FindOne(c.Context(), bson.M{"id": postId}).Decode(&post)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Failed to fetch likes for the post"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Likes fetched successfully", "likes": len(post.Likes)})
}
