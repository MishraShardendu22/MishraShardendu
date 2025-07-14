package controllers

import (
	"github.com/MishraShardendu/portfolio-backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func GetTechStack(c *fiber.Ctx) error {
	var stack []models.TechStack
	if err := mgm.Coll(&models.TechStack{}).SimpleFind(&stack, bson.M{}); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch tech stack"})
	}
	return c.JSON(stack)
}

func CreateTechStack(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	var item models.TechStack
	if err := c.BodyParser(&item); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := mgm.Coll(&item).Create(&item); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create tech stack item"})
	}
	return c.JSON(item)
}

func UpdateTechStack(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	item := &models.TechStack{}
	if err := mgm.Coll(item).FindByID(id, item); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if err := c.BodyParser(item); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := mgm.Coll(item).Update(item); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update tech stack item"})
	}
	return c.JSON(item)
}

func DeleteTechStack(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	item := &models.TechStack{}
	if err := mgm.Coll(item).FindByID(id, item); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if err := mgm.Coll(item).Delete(item); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete tech stack item"})
	}
	return c.SendStatus(204)
}
