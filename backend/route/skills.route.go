package route

import (
	"github.com/MishraShardendu22/controller/data"
	"github.com/MishraShardendu22/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupSkillRoutes(app *fiber.App, jwtSecret string) {
	api := app.Group("/api")

	protected := api.Use(middleware.JWTMiddleware(jwtSecret))
	skillsProtected := protected.Group("/skills")
	
	skillsProtected.Post("/", data.CreateSkill)

	publicGroup := api.Group("/public")
	
	publicGroup.Get("/skills", data.GetSkills)
}
