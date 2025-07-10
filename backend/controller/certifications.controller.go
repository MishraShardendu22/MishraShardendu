package controller

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetCertifications(c *fiber.Ctx) error {
	uid := c.Locals("user_id").(string)
	userObjID, err := primitive.ObjectIDFromHex(uid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid user ID", nil, "")
	}

	var user models.User
	if err := mgm.Coll(&models.User{}).FindByID(userObjID, &user); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	if len(user.Certifications) == 0 {
		return util.ResponseAPI(c, fiber.StatusOK, "No certifications found", nil, "")
	}

	certs := make([]models.CertificationOrAchievements, 0, len(user.Certifications))
	for _, certID := range user.Certifications {
		var cert models.CertificationOrAchievements
		if err := mgm.Coll(&models.CertificationOrAchievements{}).FindByID(certID, &cert); err == nil {
			certs = append(certs, cert)
		}
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Certifications retrieved successfully", certs, "")
}

func GetCertificationByID(c *fiber.Ctx) error {
	cid := c.Params("id")
	if cid == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Certification ID is required", nil, "")
	}

	certObjID, err := primitive.ObjectIDFromHex(cid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid certification ID", nil, "")
	}

	var cert models.CertificationOrAchievements
	if err := mgm.Coll(&models.CertificationOrAchievements{}).FindByID(certObjID, &cert); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Certification not found", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Certification retrieved successfully", cert, "")
}

func AddCertification(c *fiber.Ctx) error {
	var cert models.CertificationOrAchievements
	if err := c.BodyParser(&cert); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, "")
	}

	if cert.Title == "" || cert.Description == "" || cert.Issuer == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Title, description, and issuer are required", nil, "")
	}

	if err := mgm.Coll(&models.CertificationOrAchievements{}).Create(&cert); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to add certification", nil, "")
	}

	uid := c.Locals("user_id").(string)
	userObjID, err := primitive.ObjectIDFromHex(uid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid user ID", nil, "")
	}

	var user models.User
	if err := mgm.Coll(&models.User{}).FindByID(userObjID, &user); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	user.Certifications = append(user.Certifications, cert.ID)
	if err := mgm.Coll(&models.User{}).Update(&user); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update user certifications", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Certification added successfully", cert, "")
}

func UpdateCertification(c *fiber.Ctx) error {
	cid := c.Params("id")
	if cid == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Certification ID is required", nil, "")
	}

	certObjID, err := primitive.ObjectIDFromHex(cid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid certification ID", nil, "")
	}

	var input models.CertificationOrAchievements
	if err := c.BodyParser(&input); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, "")
	}

	if input.Title == "" || input.Description == "" || input.Issuer == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Title, description, and issuer are required", nil, "")
	}

	update := bson.M{"$set": bson.M{
		"title":           input.Title,
		"description":     input.Description,
		"projects":        input.Projects,
		"skills":          input.Skills,
		"certificate_url": input.CertificateURL,
		"images":          input.Images,
		"issuer":          input.Issuer,
		"issue_date":      input.IssueDate,
		"expiry_date":     input.ExpiryDate,
	}}

	if _, err := mgm.Coll(&models.CertificationOrAchievements{}).UpdateByID(c.Context(), certObjID, update); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update certification", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Certification updated successfully", input, "")
}

func RemoveCertification(c *fiber.Ctx) error {
	uid := c.Locals("user_id").(string)
	userObjID, err := primitive.ObjectIDFromHex(uid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid user ID", nil, "")
	}

	cid := c.Params("id")
	if cid == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Certification ID is required", nil, "")
	}

	certObjID, err := primitive.ObjectIDFromHex(cid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid certification ID", nil, "")
	}

	var user models.User
	if err := mgm.Coll(&models.User{}).FindByID(userObjID, &user); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	filtered := make([]primitive.ObjectID, 0, len(user.Certifications))
	for _, id := range user.Certifications {
		if id != certObjID {
			filtered = append(filtered, id)
		}
	}

	user.Certifications = filtered
	if err := mgm.Coll(&models.User{}).Update(&user); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to remove certification from user", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Certification removed successfully", nil, "")
}
