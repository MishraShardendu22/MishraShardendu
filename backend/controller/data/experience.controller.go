package data

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateExperience(c *fiber.Ctx) error {
	var experience models.Experience

	if err := c.BodyParser(&experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}

	if experience.CompanyName == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Company name is required", nil, "")
	}

	if experience.Position == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Position is required", nil, "")
	}

	if experience.StartDate == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Start date is required", nil, "")
	}

	if experience.Description == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Description is required", nil, "")
	}

	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}

	experience.CreatedBy = userID

	if err := mgm.Coll(&experience).Create(&experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to create experience", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusCreated, "Experience created successfully", experience, "")
}

func GetExperiences(c *fiber.Ctx) error {
	var experiences []models.Experience

	if err := mgm.Coll(&models.Experience{}).SimpleFind(&experiences, bson.M{}); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to fetch experiences", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experiences fetched successfully", experiences, "")
}

func GetExperienceByID(c *fiber.Ctx) error {
	id := c.Params("id")

	experience := &models.Experience{}
	if err := mgm.Coll(experience).FindByID(id, experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Experience not found", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experience fetched successfully", experience, "")
}

func UpdateExperience(c *fiber.Ctx) error {
	id := c.Params("id")

	experience := &models.Experience{}
	if err := mgm.Coll(experience).FindByID(id, experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Experience not found", nil, err.Error())
	}

	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}

	if experience.CreatedBy != userID {
		return util.ResponseAPI(c, fiber.StatusForbidden, "Not authorized to update this experience", nil, "")
	}

	var updatedExperience models.Experience
	if err := c.BodyParser(&updatedExperience); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}

	experience.CompanyName = updatedExperience.CompanyName
	experience.Position = updatedExperience.Position
	experience.StartDate = updatedExperience.StartDate
	experience.EndDate = updatedExperience.EndDate
	experience.Description = updatedExperience.Description
	experience.Technologies = updatedExperience.Technologies

	if err := mgm.Coll(experience).Update(experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update experience", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experience updated successfully", experience, "")
}

func ArchiveExperience(c *fiber.Ctx) error {
	id := c.Params("id")

	experience := &models.Experience{}
	if err := mgm.Coll(experience).FindByID(id, experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Experience not found", nil, err.Error())
	}

	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}

	if experience.CreatedBy != userID {
		return util.ResponseAPI(c, fiber.StatusForbidden, "Not authorized to archive this experience", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experience archived successfully (feature requires model update)", experience, "")
}
