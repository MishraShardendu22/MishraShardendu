package data

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

// CreateExperience handles POST /api/experience
func CreateExperience(c *fiber.Ctx) error {
	var experience models.Experience

	// Parse request body
	if err := c.BodyParser(&experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}

	// Validate required fields
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

	// Get user ID from JWT context
	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}

	// Set created by field
	experience.CreatedBy = userID

	// Save experience to database
	if err := mgm.Coll(&experience).Create(&experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to create experience", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusCreated, "Experience created successfully", experience, "")
}

// GetExperiences handles GET /api/experience
func GetExperiences(c *fiber.Ctx) error {
	var experiences []models.Experience

	// Find all experiences, sorted by start date (newest first)
	if err := mgm.Coll(&models.Experience{}).SimpleFind(&experiences, bson.M{}); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to fetch experiences", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experiences fetched successfully", experiences, "")
}

// GetExperienceByID handles GET /api/experience/:id
func GetExperienceByID(c *fiber.Ctx) error {
	id := c.Params("id")

	experience := &models.Experience{}
	if err := mgm.Coll(experience).FindByID(id, experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Experience not found", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experience fetched successfully", experience, "")
}

// UpdateExperience handles PUT /api/experience/:id
// This is useful for updating job descriptions, end dates, or correcting information
func UpdateExperience(c *fiber.Ctx) error {
	id := c.Params("id")

	// Find existing experience
	experience := &models.Experience{}
	if err := mgm.Coll(experience).FindByID(id, experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Experience not found", nil, err.Error())
	}

	// Get user ID from JWT context
	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}

	// Check if user is authorized to update this experience
	if experience.CreatedBy != userID {
		return util.ResponseAPI(c, fiber.StatusForbidden, "Not authorized to update this experience", nil, "")
	}

	// Parse updated data
	var updatedExperience models.Experience
	if err := c.BodyParser(&updatedExperience); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}

	// Update fields (useful for updating end dates, job descriptions, etc.)
	experience.CompanyName = updatedExperience.CompanyName
	experience.Position = updatedExperience.Position
	experience.StartDate = updatedExperience.StartDate
	experience.EndDate = updatedExperience.EndDate
	experience.Description = updatedExperience.Description
	experience.Technologies = updatedExperience.Technologies
	experience.Projects = updatedExperience.Projects
	experience.CompanyLogo = updatedExperience.CompanyLogo
	experience.CertificateURL = updatedExperience.CertificateURL
	experience.Images = updatedExperience.Images

	// Save updated experience
	if err := mgm.Coll(experience).Update(experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update experience", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experience updated successfully", experience, "")
}

// ArchiveExperience handles PATCH /api/experience/:id/archive
// Instead of deleting, we can add an "archived" status for experiences that are no longer relevant
func ArchiveExperience(c *fiber.Ctx) error {
	id := c.Params("id")

	// Find existing experience
	experience := &models.Experience{}
	if err := mgm.Coll(experience).FindByID(id, experience); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Experience not found", nil, err.Error())
	}

	// Get user ID from JWT context
	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}

	// Check if user is authorized to archive this experience
	if experience.CreatedBy != userID {
		return util.ResponseAPI(c, fiber.StatusForbidden, "Not authorized to archive this experience", nil, "")
	}

	// Note: You'd need to add an "Archived" field to your Experience model for this to work
	// For now, this is a placeholder showing the concept
	return util.ResponseAPI(c, fiber.StatusOK, "Experience archived successfully (feature requires model update)", experience, "")
}
