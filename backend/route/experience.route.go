package route

import (
	"github.com/MishraShardendu22/controller/data"
	"github.com/MishraShardendu22/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupExperienceRoutes(app *fiber.App, jwtSecret string) {
	api := app.Group("/api")

	protected := api.Use(middleware.JWTMiddleware(jwtSecret))
	experienceProtected := protected.Group("/experience")

	experienceProtected.Post("/", data.CreateExperience)
	experienceProtected.Put("/:id", data.UpdateExperience)
	experienceProtected.Patch("/:id/archive", data.ArchiveExperience)

	publicGroup := api.Group("/public")
	
	publicGroup.Get("/experience", data.GetExperiences)
	publicGroup.Get("/experience/:id", data.GetExperienceByID)
}
