package route

import (
	"github.com/MishraShardendu22/controller/data"
	"github.com/MishraShardendu22/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupProjectRoutes(app *fiber.App, jwtSecret string) {
	api := app.Group("/api")

	protected := api.Use(middleware.JWTMiddleware(jwtSecret))
	projectsProtected := protected.Group("/projects")
	
	projectsProtected.Post("/", data.CreateProject)
	projectsProtected.Put("/:id", data.UpdateProject)
	projectsProtected.Delete("/:id", data.DeleteProject)

	publicGroup := api.Group("/public")
	
	publicGroup.Get("/projects", data.GetProjects)
	publicGroup.Get("/projects/:id", data.GetProjectByID)
}
