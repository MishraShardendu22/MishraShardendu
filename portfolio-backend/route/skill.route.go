package route

import (
	"github.com/MishraShardendu22/controller"
	"github.com/MishraShardendu22/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupSkillRoutes(app *fiber.App, secret string) {
	// Public routes - no authentication required
	app.Get("/api/skills", controller.GetSkills)

	// Admin routes - authentication required
	app.Post("/api/skills", middleware.JWTMiddleware(secret), controller.AddSkills)
}
