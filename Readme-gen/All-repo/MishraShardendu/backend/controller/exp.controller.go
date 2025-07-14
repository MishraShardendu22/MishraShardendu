package controller

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetExperiences(c *fiber.Ctx) error {
	// Since there's only one user and we want public access,
	// fetch all experiences directly from the database
	var exps []models.Experience
	if err := mgm.Coll(&models.Experience{}).SimpleFind(&exps, bson.M{}); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to fetch experiences", nil, "")
	}

	if len(exps) == 0 {
		return util.ResponseAPI(c, fiber.StatusOK, "No experiences found", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experiences retrieved successfully", exps, "")
}

func GetExperienceByID(c *fiber.Ctx) error {
	eid := c.Params("id")
	if eid == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Experience ID is required", nil, "")
	}

	expObjID, err := primitive.ObjectIDFromHex(eid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid experience ID", nil, "")
	}

	var e models.Experience
	if err := mgm.Coll(&models.Experience{}).FindByID(expObjID, &e); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Experience not found", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experience retrieved successfully", e, "")
}

func AddExperiences(c *fiber.Ctx) error {
	var e models.Experience
	if err := c.BodyParser(&e); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, "")
	}

	if e.CompanyName == "" || e.Position == "" || e.StartDate == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Company name, position and start date are required", nil, "")
	}

	if err := mgm.Coll(&models.Experience{}).Create(&e); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to add experience", nil, "")
	}

	// Since there's only one user, get the first user from the database
	var user models.User
	if err := mgm.Coll(&models.User{}).First(bson.M{}, &user); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	user.Experiences = append(user.Experiences, e.ID)
	if err := mgm.Coll(&models.User{}).Update(&user); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update user experiences", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experience added successfully", e, "")
}

func UpdateExperiences(c *fiber.Ctx) error {
	eid := c.Params("id")
	if eid == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Experience ID is required", nil, "")
	}

	expObjID, err := primitive.ObjectIDFromHex(eid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid experience ID", nil, "")
	}

	var input models.Experience
	if err := c.BodyParser(&input); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, "")
	}

	if input.CompanyName == "" || input.Position == "" || input.StartDate == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Company name, position and start date are required", nil, "")
	}

	update := bson.M{"$set": bson.M{
		"company_name":    input.CompanyName,
		"position":        input.Position,
		"start_date":      input.StartDate,
		"end_date":        input.EndDate,
		"description":     input.Description,
		"technologies":    input.Technologies,
		"company_logo":    input.CompanyLogo,
		"certificate_url": input.CertificateURL,
		"images":          input.Images,
		"projects":        input.Projects,
	}}

	if _, err := mgm.Coll(&models.Experience{}).UpdateByID(c.Context(), expObjID, update); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update experience", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experience updated successfully", input, "")
}

func RemoveExperiences(c *fiber.Ctx) error {
	// Since there's only one user, get the first user from the database
	var user models.User
	if err := mgm.Coll(&models.User{}).First(bson.M{}, &user); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	eid := c.Params("id")
	if eid == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Experience ID is required", nil, "")
	}

	var updated []primitive.ObjectID
	found := false
	for _, expID := range user.Experiences {
		if expID.Hex() == eid {
			found = true
			continue
		}
		updated = append(updated, expID)
	}

	if !found {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Experience not found", nil, "")
	}

	user.Experiences = updated
	if err := mgm.Coll(&models.User{}).Update(&user); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to remove experience", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Experience removed successfully", nil, "")
}
