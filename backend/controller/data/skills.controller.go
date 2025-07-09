package data

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateSkill(c *fiber.Ctx) error {
	var skill models.Skills
	
	if err := c.BodyParser(&skill); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}
	
	if len(skill.Technologies) == 0 {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "At least one technology is required", nil, "")
	}

	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}

	skill.CreatedBy = userID

	if err := mgm.Coll(&skill).Create(&skill); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to create skill", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusCreated, "Skill created successfully", skill, "")
}

func GetSkills(c *fiber.Ctx) error {
	var skills []models.Skills

	if err := mgm.Coll(&models.Skills{}).SimpleFind(&skills, bson.M{}); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to fetch skills", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Skills fetched successfully", skills, "")
}

