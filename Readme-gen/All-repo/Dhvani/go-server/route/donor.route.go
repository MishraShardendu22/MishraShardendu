package route

import (
	"fmt"

	"github.com/MishraShardendu22/ChatBot-Implementation/controller"
	"github.com/MishraShardendu22/ChatBot-Implementation/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupDonorRoutes(app *fiber.App) {
	donorGroup := app.Group("/donor", middleware.DonorMiddleware)

	donorGroup.Get("/getDonorData", func(c *fiber.Ctx) error {
		userID := c.Locals("userID").(string)

		donor, err := controller.GetDonorUserByID(userID)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": err.Error()})
		}

		return c.Status(200).JSON(fiber.Map{
			"donor":   donor,
			"message": "Donor user found successfully",
		})
	})

	donorGroup.Post("/postDonorSurvey", func(c *fiber.Ctx) error {
		userID := c.Locals("userID").(string)
		fmt.Println(userID)
		return controller.PostDonorSurvey(userID, c)
	})
}
