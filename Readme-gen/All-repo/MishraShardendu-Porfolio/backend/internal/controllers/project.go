package controllers

import (
	"github.com/MishraShardendu/portfolio-backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func GetFeaturedProjects(c *fiber.Ctx) error {
	var projects []models.Project
	if err := mgm.Coll(&models.Project{}).SimpleFind(&projects, bson.M{"featured": true}); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch projects"})
	}
	return c.JSON(projects)
}

func GetAllProjects(c *fiber.Ctx) error {
	category := c.Query("category")
	tech := c.Query("tech")
	filter := bson.M{}
	if category != "" {
		filter["category"] = category
	}
	if tech != "" {
		filter["techStack"] = bson.M{"$in": []string{tech}}
	}
	var projects []models.Project
	if err := mgm.Coll(&models.Project{}).SimpleFind(&projects, filter); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch projects"})
	}
	return c.JSON(projects)
}

func CreateProject(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	var project models.Project
	if err := c.BodyParser(&project); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := mgm.Coll(&project).Create(&project); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create project"})
	}
	return c.JSON(project)
}

func UpdateProject(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	project := &models.Project{}
	if err := mgm.Coll(project).FindByID(id, project); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if err := c.BodyParser(project); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := mgm.Coll(project).Update(project); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update project"})
	}
	return c.JSON(project)
}

func DeleteProject(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	project := &models.Project{}
	if err := mgm.Coll(project).FindByID(id, project); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if err := mgm.Coll(project).Delete(project); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete project"})
	}
	return c.SendStatus(204)
}
