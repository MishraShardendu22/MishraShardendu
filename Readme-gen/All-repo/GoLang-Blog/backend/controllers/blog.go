package controllers

import (
	"fmt"

	"github.com/MishraShardendu22/schema"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func PostBlog(c *fiber.Ctx, collections *mongo.Collection) error {
	var blog schema.Post

	fmt.Println("Debug-0")
	if err := c.BodyParser(&blog); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Error parsing blog data"})
	}

	fmt.Println("Debug-1")
	_, err := collections.InsertOne(c.Context(), blog)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error adding blog"})
	}

	fmt.Println("Debug-2")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Blog added successfully"})
}

func DeleteBlog(c *fiber.Ctx, collections *mongo.Collection) error {
	var title_blog string

	if err := c.BodyParser(&title_blog); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Error parsing blog data"})
	}

	_, err := collections.DeleteOne(c.Context(), bson.M{"title": title_blog})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error deleting blog"})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Blog deleted successfully"})
}

// func EditBlog(c *fiber.Ctx, collections *mongo.Collection) error {
//     var id string
//     var updatedBlog schema.Post

//     fmt.Println("Debug-0")

//     // Parse the ID from URL parameter
//     id = c.Params("id")
// 	fmt.Println("ID: ", id)

//     fmt.Println("Debug-1")
//     // Parse the updated blog data
//     if err := c.BodyParser(&updatedBlog); err != nil {
//         return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"message": "Error parsing blog data"})
//     }
// 	fmt.Println("Updated Blog: ", updatedBlog)

//     fmt.Println("Debug-2")
//     // Update the blog with the provided ID
//     filter := bson.M{"_id": id}
//     update := bson.M{"$set": updatedBlog}

//     fmt.Println("Debug-3")
//     _, err := collections.UpdateOne(c.Context(), filter, update)
//     if err != nil {
//         return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error updating blog"})
//     }

//     fmt.Println("Debug-4")
//     return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Blog updated successfully"})
// }

func GetBlog(c *fiber.Ctx, collections *mongo.Collection) error {
	var blogs []schema.Post

	// Fetch all blogs from the collection
	cursor, err := collections.Find(c.Context(), bson.M{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error retrieving blogs"})
	}
	defer cursor.Close(c.Context())

	// Decode the cursor into the blogs slice
	if err := cursor.All(c.Context(), &blogs); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"message": "Error decoding blogs"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Blogs retrieved successfully",
		"data":    blogs,
	})
}
