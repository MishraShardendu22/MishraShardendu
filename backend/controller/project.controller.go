package controller

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetProjects(c *fiber.Ctx) error {
	uid := c.Locals("user_id").(string)
	userObjID, err := primitive.ObjectIDFromHex(uid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid user ID", nil, "")
	}
	var user models.User
	if err := mgm.Coll(&models.User{}).FindByID(userObjID, &user); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}
	if len(user.Projects) == 0 {
		return util.ResponseAPI(c, fiber.StatusOK, "No projects found", nil, "")
	}

	projects := make([]models.Project, 0, len(user.Projects))
	for _, projID := range user.Projects {
		var p models.Project
		if err := mgm.Coll(&models.Project{}).FindByID(projID, &p); err == nil {
			projects = append(projects, p)
		}
	}
	return util.ResponseAPI(c, fiber.StatusOK, "Projects retrieved successfully", projects, "")
}

func GetProjectByID(c *fiber.Ctx) error {
	pid := c.Params("id")
	if pid == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Project ID is required", nil, "")
	}
	projObjID, err := primitive.ObjectIDFromHex(pid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid project ID", nil, "")
	}
	var p models.Project
	if err := mgm.Coll(&models.Project{}).FindByID(projObjID, &p); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Project not found", nil, "")
	}
	return util.ResponseAPI(c, fiber.StatusOK, "Project retrieved successfully", p, "")
}

func AddProjects(c *fiber.Ctx) error {
	var p models.Project
	if err := c.BodyParser(&p); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, "")
	}
	if p.ProjectName == "" || p.SmallDescription == "" || p.Description == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Name, small description and description are required", nil, "")
	}
	if err := mgm.Coll(&models.Project{}).Create(&p); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to add project", nil, "")
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
	user.Projects = append(user.Projects, p.ID)
	if err := mgm.Coll(&models.User{}).Update(&user); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update user projects", nil, "")
	}
	return util.ResponseAPI(c, fiber.StatusOK, "Project added successfully", p, "")
}

func UpdateProjects(c *fiber.Ctx) error {
	pid := c.Params("id")
	if pid == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Project ID is required", nil, "")
	}
	projObjID, err := primitive.ObjectIDFromHex(pid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid project ID", nil, "")
	}

	var input models.Project
	if err := c.BodyParser(&input); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, "")
	}
	if input.ProjectName == "" || input.SmallDescription == "" || input.Description == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Name, small description and description are required", nil, "")
	}

	update := bson.M{"$set": bson.M{
		"project_name":       input.ProjectName,
		"small_description":  input.SmallDescription,
		"description":        input.Description,
		"skills":             input.Skills,
		"project_repository": input.ProjectRepository,
		"project_live_link":  input.ProjectLiveLink,
		"project_video":      input.ProjectVideo,
	}}
	if _, err := mgm.Coll(&models.Project{}).UpdateByID(c.Context(), projObjID, update); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update project", nil, "")
	}
	return util.ResponseAPI(c, fiber.StatusOK, "Project updated successfully", input, "")
}

func RemoveProjects(c *fiber.Ctx) error {
	uid := c.Locals("user_id").(string)
	userObjID, err := primitive.ObjectIDFromHex(uid)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid user ID", nil, "")
	}
	pid := c.Params("id")
	if pid == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Project ID is required", nil, "")
	}
	var user models.User
	if err := mgm.Coll(&models.User{}).FindByID(userObjID, &user); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	updated := make([]primitive.ObjectID, 0, len(user.Projects))
	for _, projID := range user.Projects {
		if projID.Hex() == pid {
			continue
		}
		updated = append(updated, projID)
	}

	user.Projects = updated
	if err := mgm.Coll(&models.User{}).Update(&user); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to remove project from user", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Project removed successfully", nil, "")
}
