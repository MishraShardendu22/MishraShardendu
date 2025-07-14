package controllers

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func CheckOTPHandler(c *fiber.Ctx, collections *mongo.Collection) error {
	fmt.Println("This is The Check OTP Route")

	var otpCheck struct {
		Val int `json:"val"`
	}
	if err := c.BodyParser(&otpCheck); err != nil {
		fmt.Println(err)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid JSON",
		})
	}

	if otpCheck.Val != otp {
		collections.DeleteOne(c.Context(), bson.M{"username": usernameTemp})
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid OTP Authentication Failed",
		})
	}

	fmt.Println("Success OTP")
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"error":   false,
		"message": "OTP Authentication Successful",
	})
}
