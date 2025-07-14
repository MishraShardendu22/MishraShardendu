package controllers

import (
	"fmt"
	"time"

	"github.com/MishraShardendu22/schema"
	"github.com/MishraShardendu22/utils"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/exp/rand"
)

var otp int
var usernameTemp string

func SignupHandler(c *fiber.Ctx, collections *mongo.Collection) error {
	fmt.Println("This is The Signup Route")

	var userSignUp schema.User
	if err := c.BodyParser(&userSignUp); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Invalid JSON",
		})
	}
	fmt.Println("Debug - 0")

	// Set default values
	userSignUp.SetDefaults()

	fmt.Println("Debug - 0.5")
	if collections.FindOne(c.Context(), bson.M{"$or": []bson.M{
		{"email": userSignUp.Email},
		{"username": userSignUp.Username},
	}}).Decode(&userSignUp) == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "User Already Exists",
		})
	}
	fmt.Println("Debug - 1")

	// Sending OTP
	rand.Seed(uint64(time.Now().UnixNano())) // Seed the random generator
	otp = rand.Intn(900000) + 100000
	fmt.Println("OTP:", otp)
	utils.SendEmailFast(userSignUp.Email, otp)
	usernameTemp = userSignUp.Username

	userSignUp.Password = utils.HashPassWord(userSignUp.Password)

	_, err := collections.InsertOne(c.Context(), userSignUp)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   true,
			"message": "Error Registering The User Sorry!!",
		})
	}
	fmt.Println("Debug - 2 END")

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"error":   false,
		"message": "User Registered Successfully",
	})
}
