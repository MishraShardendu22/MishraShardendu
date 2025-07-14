package controller

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func AdminRegisterAndLogin(c *fiber.Ctx, adminPass string, secret string) error {
	var req models.User

	if err := c.BodyParser(&req); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, "")
	}

	if req.AdminPass != adminPass {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid admin password", nil, "")
	}

	req.AdminPass = ""

	if req.Email == "" || req.Password == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "email and password are required", nil, "")
	}

	existing := &models.User{}
	err := mgm.Coll(existing).First(bson.M{"email": req.Email}, existing)
	if err == nil {
		// User exists - verify password
		if !util.CheckPassword(req.Password, existing.Password) {
			return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid email or password", nil, "")
		}

		token, _ := util.GenerateJWT(existing.ID.Hex(), existing.Email, secret)
		return util.ResponseAPI(c, fiber.StatusAccepted, "User already exists", existing, token)
	}

	// User not found - create new
	req.Password = util.HashPassword(req.Password)
	if err := mgm.Coll(&req).Create(&req); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to register admin", err.Error(), "")
	}

	token, _ := util.GenerateJWT(req.ID.Hex(), req.Email, secret)

	return util.ResponseAPI(c, fiber.StatusCreated, "Admin registered successfully", req, token)
}

func AdminGet(c *fiber.Ctx) error {
	userId := c.Locals("user_id").(string)
	if userId == "" {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Unauthorized", nil, "")
	}

	user := &models.User{}
	err := mgm.Coll(user).FindByID(userId, user)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	user.Password = "" // Don't return password hash
	return util.ResponseAPI(c, fiber.StatusOK, "User profile fetched successfully", user, "")
}