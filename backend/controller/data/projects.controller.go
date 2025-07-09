package data

import (
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
)

func CreateProject(c *fiber.Ctx) error {
	var project models.Projects
	
	if err := c.BodyParser(&project); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}
	
	if project.ProjectName == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Project name is required", nil, "")
	}
	
	if project.Description == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Description is required", nil, "")
	}
	
	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}
	
	project.CreatedBy = userID
	
	if err := mgm.Coll(&project).Create(&project); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to create project", nil, err.Error())
	}
	
	return util.ResponseAPI(c, fiber.StatusCreated, "Project created successfully", project, "")
}

func GetProjects(c *fiber.Ctx) error {
	var projects []models.Projects
	
	if err := mgm.Coll(&models.Projects{}).SimpleFind(&projects, bson.M{}); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to fetch projects", nil, err.Error())
	}
	
	return util.ResponseAPI(c, fiber.StatusOK, "Projects fetched successfully", projects, "")
}

func GetProjectByID(c *fiber.Ctx) error {
	id := c.Params("id")
	
	project := &models.Projects{}
	if err := mgm.Coll(project).FindByID(id, project); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Project not found", nil, err.Error())
	}
	
	return util.ResponseAPI(c, fiber.StatusOK, "Project fetched successfully", project, "")
}

func UpdateProject(c *fiber.Ctx) error {
	id := c.Params("id")
	
	project := &models.Projects{}
	if err := mgm.Coll(project).FindByID(id, project); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Project not found", nil, err.Error())
	}
	
	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}
	
	if project.CreatedBy != userID {
		return util.ResponseAPI(c, fiber.StatusForbidden, "Not authorized to update this project", nil, "")
	}
	
	var updatedProject models.Projects
	if err := c.BodyParser(&updatedProject); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request body", nil, err.Error())
	}
	
	project.ProjectName = updatedProject.ProjectName
	project.SmallDescription = updatedProject.SmallDescription
	project.Description = updatedProject.Description
	project.Skills = updatedProject.Skills
	project.ProjectRepository = updatedProject.ProjectRepository
	project.ProjectLiveLink = updatedProject.ProjectLiveLink
	project.ProjectVideo = updatedProject.ProjectVideo
	
	if err := mgm.Coll(project).Update(project); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to update project", nil, err.Error())
	}
	
	return util.ResponseAPI(c, fiber.StatusOK, "Project updated successfully", project, "")
}

func DeleteProject(c *fiber.Ctx) error {
	id := c.Params("id")
	
	project := &models.Projects{}
	if err := mgm.Coll(project).FindByID(id, project); err != nil {
		return util.ResponseAPI(c, fiber.StatusNotFound, "Project not found", nil, err.Error())
	}
	
	userID, ok := c.Locals("user_id").(string)
	if !ok {
		return util.ResponseAPI(c, fiber.StatusUnauthorized, "Invalid user context", nil, "")
	}
	
	if project.CreatedBy != userID {
		return util.ResponseAPI(c, fiber.StatusForbidden, "Not authorized to delete this project", nil, "")
	}
	
	if err := mgm.Coll(project).Delete(project); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "Failed to delete project", nil, err.Error())
	}
	
	return util.ResponseAPI(c, fiber.StatusOK, "Project deleted successfully", nil, "")
}
