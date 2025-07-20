package route

import (
	"github.com/MishraShardendu22/controller"
	"github.com/MishraShardendu22/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupExpRoutes(app *fiber.App, secret string) {
	// Public routes - no authentication required
	app.Get("/api/experiences", controller.GetExperiences)
	app.Get("/api/experiences/:id", controller.GetExperienceByID)

	// Admin routes - authentication required
	app.Post("/api/experiences", middleware.JWTMiddleware(secret), controller.AddExperiences)
	app.Put("/api/experiences/:id", middleware.JWTMiddleware(secret), controller.UpdateExperiences)
	app.Delete("/api/experiences/:id", middleware.JWTMiddleware(secret), controller.RemoveExperiences)
}
