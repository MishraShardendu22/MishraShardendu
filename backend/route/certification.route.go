package route

import (
	"github.com/MishraShardendu22/controller"
	"github.com/MishraShardendu22/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupCertificationRoutes(app *fiber.App, secret string) {
	// Public routes - no authentication required
	app.Get("/api/certifications", controller.GetCertifications)
	app.Get("/api/certifications/:id", controller.GetCertificationByID)

	// Admin routes - authentication required
	app.Post("/api/certifications", middleware.JWTMiddleware(secret), controller.AddCertification)
	app.Put("/api/certifications/:id", middleware.JWTMiddleware(secret), controller.UpdateCertification)
	app.Delete("/api/certifications/:id", middleware.JWTMiddleware(secret), controller.RemoveCertification)
}
