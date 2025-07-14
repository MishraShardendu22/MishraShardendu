package controllers

import (
	"github.com/MishraShardendu/portfolio-backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func GetExperience(c *fiber.Ctx) error {
	var exp []models.Experience
	if err := mgm.Coll(&models.Experience{}).SimpleFind(&exp, bson.M{}); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch experience"})
	}
	return c.JSON(exp)
}

func CreateExperience(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	var exp models.Experience
	if err := c.BodyParser(&exp); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := mgm.Coll(&exp).Create(&exp); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create experience"})
	}
	return c.JSON(exp)
}

func UpdateExperience(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	exp := &models.Experience{}
	if err := mgm.Coll(exp).FindByID(id, exp); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if err := c.BodyParser(exp); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := mgm.Coll(exp).Update(exp); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update experience"})
	}
	return c.JSON(exp)
}

func DeleteExperience(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	exp := &models.Experience{}
	if err := mgm.Coll(exp).FindByID(id, exp); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if err := mgm.Coll(exp).Delete(exp); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete experience"})
	}
	return c.SendStatus(204)
}
