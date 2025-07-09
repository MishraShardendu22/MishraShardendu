package data

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateCertification(c *fiber.Ctx) error {
	var certification models.CertificationOrAchivements

	if err := c.BodyParser(&certification); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}

	if certification.Title == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Title is required", nil, "")
	}

	if certification.Description == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Description is required", nil, "")
	}

	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}

	certification.CreatedBy = userID

	if err := mgm.Coll(&certification).Create(&certification); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to create certification", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusCreated, "Certification created successfully", certification, "")
}

func GetCertifications(c *fiber.Ctx) error {
	var certifications []models.CertificationOrAchivements

	if err := mgm.Coll(&models.CertificationOrAchivements{}).SimpleFind(&certifications, bson.M{}); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to fetch certifications", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Certifications fetched successfully", certifications, "")
}

func GetCertificationByID(c *fiber.Ctx) error {
	id := c.Params("id")

	certification := &models.CertificationOrAchivements{}
	if err := mgm.Coll(certification).FindByID(id, certification); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Certification not found", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Certification fetched successfully", certification, "")
}

func UpdateCertification(c *fiber.Ctx) error {
	id := c.Params("id")

	certification := &models.CertificationOrAchivements{}
	if err := mgm.Coll(certification).FindByID(id, certification); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Certification not found", nil, err.Error())
	}

	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}

	if certification.CreatedBy != userID {
		return util.ResponseAPI(c, fiber.StatusForbidden, "Not authorized to update this certification", nil, "")
	}

	var updatedCertification models.CertificationOrAchivements
	if err := c.BodyParser(&updatedCertification); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}

	certification.Title = updatedCertification.Title
	certification.Description = updatedCertification.Description
	certification.Projects = updatedCertification.Projects
	certification.Skills = updatedCertification.Skills
	certification.CertificateURL = updatedCertification.CertificateURL
	certification.Images = updatedCertification.Images
	certification.Issuer = updatedCertification.Issuer
	certification.IssueDate = updatedCertification.IssueDate
	certification.ExpiryDate = updatedCertification.ExpiryDate

	if err := mgm.Coll(certification).Update(certification); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update certification", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Certification updated successfully", certification, "")
}

func DeleteCertification(c *fiber.Ctx) error {
	id := c.Params("id")

	certification := &models.CertificationOrAchivements{}
	if err := mgm.Coll(certification).FindByID(id, certification); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Certification not found", nil, err.Error())
	}

	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}

	if certification.CreatedBy != userID {
		return util.ResponseAPI(c, fiber.StatusForbidden, "Not authorized to delete this certification", nil, "")
	}

	if err := mgm.Coll(certification).Delete(certification); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to delete certification", nil, err.Error())
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Certification deleted successfully", nil, "")
}
