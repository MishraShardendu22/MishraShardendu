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
	// Since there's only one user and we want public access,
	// fetch all certifications directly from the database
	var certs []models.CertificationOrAchievements
	if err := mgm.Coll(&models.CertificationOrAchievements{}).SimpleFind(&certs, bson.M{}); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to fetch certifications", nil, "")
	}

	if len(certs) == 0 {
		return util.ResponseAPI(c, fiber.StatusOK, "No certifications found", nil, "")
	}

	certs = reverseCerts(certs)

	return util.ResponseAPI(c, fiber.StatusOK, "Certifications retrieved successfully", certs, "")
}

func reverseCerts(certs []models.CertificationOrAchievements) []models.CertificationOrAchievements {
	for i, j := 0, len(certs)-1; i < j; i, j = i+1, j-1 {
		certs[i], certs[j] = certs[j], certs[i]
	}
	return certs
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

	// Since there's only one user, get the first user from the database
	var user models.User
	if err := mgm.Coll(&models.User{}).First(bson.M{}, &user); err != nil {
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
	// Fetch first (and only) user
	var user models.User
	userColl := mgm.Coll(&models.User{})
	if err := userColl.First(bson.M{}, &user); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	cid := c.Params("id")
	if cid == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Certification ID is required", nil, "")
	}

	certObjID, err := primitive.ObjectIDFromHex(cid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid certification ID", nil, "")
	}

	// Filter certification ID
	newCerts := make([]primitive.ObjectID, 0, len(user.Certifications))
	for _, id := range user.Certifications {
		if id != certObjID {
			newCerts = append(newCerts, id)
		}
	}
	user.Certifications = newCerts

	// Save updated user
	if err := userColl.Update(&user); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update user certifications", nil, "")
	}

	// Delete the certification document
	certColl := mgm.Coll(&models.CertificationOrAchievements{})
	cert := &models.CertificationOrAchievements{}
	cert.SetID(certObjID)

	if err := certColl.Delete(cert); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to delete certification", nil, "")
	}


	return util.ResponseAPI(c, fiber.StatusOK, "Certification removed successfully", nil, "")
}
