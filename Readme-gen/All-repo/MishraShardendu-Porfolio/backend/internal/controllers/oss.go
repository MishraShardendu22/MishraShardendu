package controllers

import (
	"github.com/MishraShardendu/portfolio-backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func GetOSS(c *fiber.Ctx) error {
	var oss []models.OSSContribution
	if err := mgm.Coll(&models.OSSContribution{}).SimpleFind(&oss, bson.M{}); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to fetch OSS contributions"})
	}
	return c.JSON(oss)
}

func CreateOSS(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	var oss models.OSSContribution
	if err := c.BodyParser(&oss); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := mgm.Coll(&oss).Create(&oss); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create OSS contribution"})
	}
	return c.JSON(oss)
}

func UpdateOSS(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	oss := &models.OSSContribution{}
	if err := mgm.Coll(oss).FindByID(id, oss); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if err := c.BodyParser(oss); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if err := mgm.Coll(oss).Update(oss); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update OSS contribution"})
	}
	return c.JSON(oss)
}

func DeleteOSS(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	id := c.Params("id")
	oss := &models.OSSContribution{}
	if err := mgm.Coll(oss).FindByID(id, oss); err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Not found"})
	}
	if err := mgm.Coll(oss).Delete(oss); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete OSS contribution"})
	}
	return c.SendStatus(204)
}
