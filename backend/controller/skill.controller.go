package controller

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func AddSkills(c *fiber.Ctx) error {
	var payload struct {
		Skills []string `json:"skills"`
	}
	err := c.BodyParser(&payload)

	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, "")
	}

	if len(payload.Skills) == 0 {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Skills cannot be empty", nil, "")
	}
	userID := c.Locals("user_id").(string)

	objID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid user ID", nil, "")
	}

	user := &models.User{}
	err = mgm.Coll(user).FindByID(objID, user)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	user.Skills = append(user.Skills, payload.Skills...)
	err = mgm.Coll(user).Update(user)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update skills", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Skills added successfully", user.Skills, "")
}

func GetSkills(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(string)
	objID, err := primitive.ObjectIDFromHex(userID)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid user ID", nil, "")
	}

	user := &models.User{}
	err = mgm.Coll(user).FindByID(objID, user)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	if len(user.Skills) == 0 {
		return util.ResponseAPI(c, fiber.StatusOK, "No skills found", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Skills retrieved successfully", user.Skills, "")
}
