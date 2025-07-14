package controllers

import (
	"fmt"

	"github.com/MishraShardendu22/utils"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

type LoginDetails struct {
	Data     string `json:"data"`
	Password string `json:"pass"`
}

func LoginHandler(c *fiber.Ctx, collections *mongo.Collection) error {
	var userLogin LoginDetails
	fmt.Println("D-1 Login")
	if err := c.BodyParser(&userLogin); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid data format",
		})
	}

	fmt.Println("D-2 Login")
	var result bson.M
	err := collections.FindOne(c.Context(), bson.M{
		"$or": []bson.M{
			{"email": userLogin.Data},
			{"username": userLogin.Data},
		},
	}).Decode(&result)

	fmt.Println("D-3 Login")
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid credentials",
		})
	}

	fmt.Println("D-4 Login")
	err = bcrypt.CompareHashAndPassword([]byte(result["password"].(string)), []byte(userLogin.Password))
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid credentials",
		})
	}

	fmt.Println("D-5 Login")
	token, err := utils.GenerateToken(userLogin.Data)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   true,
			"message": "Could not generate token",
		})
	}

	fmt.Println("D-6 Login")
	fmt.Println(result)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error":   false,
		"message": "Login successful",
		"token":   token,
		"info":    result,
	})
}
