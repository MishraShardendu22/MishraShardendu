package controller

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func AdminRegisterAndLogin(c *fiber.Ctx, adminPass string, secret string) error {
	var adminUser models.User
	if err := c.BodyParser(&adminUser); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, "")
	}

	if adminUser.Email == "" || adminUser.Password == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "email and password are required", nil, "")
	}

	if adminUser.AdminPass != adminPass {
		return util.ResponseAPI(c, fiber.StatusForbidden, "Invalid admin password", nil, "")
	}

	existing := &models.User{}
	err := mgm.Coll(existing).First(bson.M{"email": adminUser.Email}, existing)
	if err == nil {
		token, _ := util.GenerateJWT(existing.ID.Hex(), existing.Email, secret)
		return util.ResponseAPI(c, fiber.StatusAccepted, "User already exists", existing, token)
	}

	if err := mgm.Coll(&adminUser).Create(&adminUser); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to register admin", nil, err.Error())
	}

	token, _ := util.GenerateJWT(adminUser.ID.Hex(), adminUser.Email, secret)
	return util.ResponseAPI(c, fiber.StatusCreated, "Admin registered successfully", adminUser, token)
}