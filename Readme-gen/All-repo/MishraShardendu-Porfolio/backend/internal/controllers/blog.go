package controllers

import (
	"github.com/MishraShardendu/portfolio-backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func GetBlogs(c *fiber.Ctx) error {
	var blogs []models.Blog
	if err := mgm.Coll(&models.Blog{}).SimpleFind(&blogs, bson.M{"published": true}); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch blogs"})
	}
	return c.JSON(blogs)
}

func GetBlogByID(c *fiber.Ctx) error {
	id := c.Params("id")
	blog := &models.Blog{}
	if err := mgm.Coll(blog).FindByID(id, blog); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if !blog.Published {
		return c.Status(403).JSON(fiber.Map{"error": "Not published"})
	}
	return c.JSON(blog)
}

func CreateBlog(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	var blog models.Blog
	if err := c.BodyParser(&blog); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	blog.Author = claims["email"].(string)
	blog.Published = false
	if err := mgm.Coll(&blog).Create(&blog); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create blog"})
	}
	return c.JSON(blog)
}

func PublishBlog(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	blog := &models.Blog{}
	if err := mgm.Coll(blog).FindByID(id, blog); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	blog.Published = true
	if err := mgm.Coll(blog).Update(blog); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to publish blog"})
	}
	return c.JSON(blog)
}

func DeleteBlog(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	blog := &models.Blog{}
	if err := mgm.Coll(blog).FindByID(id, blog); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if err := mgm.Coll(blog).Delete(blog); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete blog"})
	}
	return c.SendStatus(204)
}
