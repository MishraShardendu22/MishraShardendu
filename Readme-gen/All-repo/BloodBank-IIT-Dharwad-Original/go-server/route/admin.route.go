package route

import (
	"github.com/MishraShardendu22/ChatBot-Implementation/controller"
	"github.com/MishraShardendu22/ChatBot-Implementation/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupAdminRoutes(app *fiber.App) {
	adminGroup := app.Group("/admin", middleware.AdminMiddleware)

	adminGroup.Get("/getAdminData", func(c *fiber.Ctx) error {
		userID := c.Locals("userID").(string)

		admin, err := controller.GetAdminUserByID(userID)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": err.Error()})
		}

		return c.Status(200).JSON(fiber.Map{
			"admin":   admin,
			"message": "Admin user found successfully",
		})
	})
}
