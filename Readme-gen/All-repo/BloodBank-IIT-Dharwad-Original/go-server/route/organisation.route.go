package route

import (
	"github.com/MishraShardendu22/ChatBot-Implementation/controller"
	"github.com/MishraShardendu22/ChatBot-Implementation/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupOraganisationRoutes(app *fiber.App) {
	orgGroup := app.Group("/organisation", middleware.OrganisationMiddleware)

	orgGroup.Get("/getOrganisationData", func(c *fiber.Ctx) error {
		userID := c.Locals("userID").(string)

		oraganisation, err := controller.GetOrganisationUserByID(userID)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": err.Error()})
		}

		return c.Status(200).JSON(fiber.Map{
			"donor":   oraganisation,
			"message": "Org found successfully",
		})
	})
}
