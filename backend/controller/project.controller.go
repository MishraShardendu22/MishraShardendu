package controller

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func GetProjects(c *fiber.Ctx) error {
	userId := c.Locals("user_id").(string)

	if userId == "" {
		return fiber.NewError(fiber.StatusBadRequest, "User ID is required")
	}

	var user models.User
	err := mgm.Coll(&models.User{}).FindByID(userId, &user)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	if len(user.Projects) == 0 {
		return util.ResponseAPI(c, fiber.StatusOK, "No projects found", nil, "")
	}

	var projects []models.Project
	projects = user.Projects
	return util.ResponseAPI(c, fiber.StatusOK, "Projects retrieved successfully", projects, "")
}

func GetProjectByID(c *fiber.Ctx) error {
	projectId := c.Params("id")
	if projectId == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Project ID is required")
	}

	var project models.Project
	err := mgm.Coll(&models.Project{}).FindByID(projectId, &project)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Project not found", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Project retrieved successfully", project, "")
}

func AddProjects(c *fiber.Ctx) error {
	var project models.Project
	err := c.BodyParser(&project)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, "")
	}

	if project.ProjectName == "" || project.SmallDescription == "" || project.Description == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Project name, small description and description are required", nil, "")
	}

	userId := c.Locals("user_id").(string)
	if userId == "" {
		return fiber.NewError(fiber.StatusBadRequest, "User ID is required")
	}

	err = mgm.Coll(&models.Project{}).Create(&project)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to add project", nil, "")
	}

	var user models.User
	err = mgm.Coll(&models.User{}).FindByID(userId, &user)

	if err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	user.Projects = append(user.Projects, project)
	err = mgm.Coll(&models.User{}).Update(&user)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update user projects", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Project added successfully", project, "")
}

func UpdateProjects(c *fiber.Ctx) error {
	projectId := c.Params("id")
	if projectId == "" {
		return fiber.NewError(fiber.StatusBadRequest, "Project ID is required")
	}

	var project models.Project
	err := c.BodyParser(&project)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, "")
	}

	if project.ProjectName == "" || project.SmallDescription == "" || project.Description == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Project name, small description and description are required", nil, "")
	}

	// Use context from Fiber and proper update document
	update := bson.M{"$set": project}
	_, err = mgm.Coll(&models.Project{}).UpdateByID(c.Context(), projectId, update)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update project", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Project updated successfully", project, "")
}

func RemoveProjects(c *fiber.Ctx) error {
	userId := c.Locals("user_id").(string)
	if userId == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "User ID is required", nil, "")
	}

	projectId := c.Params("id")
	if projectId == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Project ID is required", nil, "")
	}

	var user models.User
	err := mgm.Coll(&models.User{}).FindByID(userId, &user)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "User not found", nil, "")
	}

	project := user.Projects
	for i, p := range project {
		if p.ID.Hex() == projectId {
			project = append(project[:i], project[i+1:]...)
			break
		}
	}

	if len(project) == len(user.Projects) {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Project not found", nil, "")
	}

	user.Projects = project
	err = mgm.Coll(&models.User{}).Update(&user)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update user projects", nil, "")
	}

	return util.ResponseAPI(c, fiber.StatusOK, "Project removed successfully", nil, "")
}
