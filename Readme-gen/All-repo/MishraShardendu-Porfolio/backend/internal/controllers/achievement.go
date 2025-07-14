package controllers

import (
	"github.com/MishraShardendu/portfolio-backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func GetAchievements(c *fiber.Ctx) error {
	var ach []models.Achievement
	if err := mgm.Coll(&models.Achievement{}).SimpleFind(&ach, bson.M{}); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch achievements"})
	}
	return c.JSON(ach)
}

func CreateAchievement(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	var ach models.Achievement
	if err := c.BodyParser(&ach); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := mgm.Coll(&ach).Create(&ach); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create achievement"})
	}
	return c.JSON(ach)
}

func UpdateAchievement(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	ach := &models.Achievement{}
	if err := mgm.Coll(ach).FindByID(id, ach); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if err := c.BodyParser(ach); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := mgm.Coll(ach).Update(ach); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update achievement"})
	}
	return c.JSON(ach)
}

func DeleteAchievement(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	ach := &models.Achievement{}
	if err := mgm.Coll(ach).FindByID(id, ach); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if err := mgm.Coll(ach).Delete(ach); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete achievement"})
	}
	return c.SendStatus(204)
}
