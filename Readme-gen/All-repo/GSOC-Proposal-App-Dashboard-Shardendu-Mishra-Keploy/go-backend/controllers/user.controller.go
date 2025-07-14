package controllers

import (
	"time"

	"github.com/MishraShardendu22/go-backend/database"
	"github.com/MishraShardendu22/go-backend/model"
	utils "github.com/MishraShardendu22/go-backend/util"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func RegisterUser(c *fiber.Ctx) error {
	var newUser model.User

	if err := c.BodyParser(&newUser); err != nil {
		return utils.ResponseAPI(c, 400, "Error parsing request body", "", "")
	}

	newUser.CreatedAt = time.Now().Local()

	if newUser.Name == "" || newUser.Email == "" || newUser.Image == "" {
		return utils.ResponseAPI(c, 400, "Please fill all the fields", "", "")
	}

	ctx := c.Context()
	collection := database.Client.Database("main").Collection("users")

	result := collection.FindOne(ctx, bson.M{"email": newUser.Email})
	if result.Err() == nil {
		return utils.ResponseAPI(c, 200, "User already exists", newUser, "")
	} else if result.Err() != mongo.ErrNoDocuments {
		return utils.ResponseAPI(c, 500, "Error finding user", "", "")
	}

	_, err := collection.InsertOne(ctx, newUser)
	if err != nil {
		return utils.ResponseAPI(c, 500, "Error inserting user", "", "")
	}

	return utils.ResponseAPI(c, 200, "User registered successfully", newUser, "")
}
