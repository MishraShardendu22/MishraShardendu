package route

import (
	"github.com/MishraShardendu22/controller/data"
	"github.com/MishraShardendu22/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupCertificationRoutes(app *fiber.App, jwtSecret string) {
	api := app.Group("/api")

	protected := api.Use(middleware.JWTMiddleware(jwtSecret))
	certificationsProtected := protected.Group("/certifications")

	certificationsProtected.Post("/", data.CreateCertification)
	certificationsProtected.Put("/:id", data.UpdateCertification)
	certificationsProtected.Delete("/:id", data.DeleteCertification)

	publicGroup := api.Group("/public")

	publicGroup.Get("/certifications", data.GetCertifications)
	publicGroup.Get("/certifications/:id", data.GetCertificationByID)
}
