package route

import (
	"github.com/MishraShardendu22/controller"
	"github.com/MishraShardendu22/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupAdminRoutes(app *fiber.App, adminPass string, jwtSecret string) {
	api := app.Group("/api")
	
	api.Post("/admin/auth", func(c *fiber.Ctx) error {
		return controller.AdminRegisterAndLogin(c, adminPass, jwtSecret)
	})

	api.Get("/admin/auth",middleware.JWTMiddleware(jwtSecret) ,controller.AdminGet)
}
