package route

import (
	"github.com/MishraShardendu22/controller"
	"github.com/MishraShardendu22/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupCertificationRoutes(app *fiber.App, secret string) {
	app.Get("/api/certifications", middleware.JWTMiddleware(secret), controller.GetCertifications)
	app.Post("/api/certifications", middleware.JWTMiddleware(secret), controller.AddCertification)
	app.Get("/api/certifications/:id", middleware.JWTMiddleware(secret), controller.GetCertificationByID)
	app.Put("/api/certifications/:id", middleware.JWTMiddleware(secret), controller.UpdateCertification)
	app.Delete("/api/certifications/:id", middleware.JWTMiddleware(secret), controller.RemoveCertification)
}
