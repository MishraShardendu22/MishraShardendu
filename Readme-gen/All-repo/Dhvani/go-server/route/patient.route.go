package route

import (
	"fmt"

	"github.com/MishraShardendu22/ChatBot-Implementation/controller"
	"github.com/MishraShardendu22/ChatBot-Implementation/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupPatientRoutes(app *fiber.App) {
	patientGroup := app.Group("/patient", middleware.PatientMiddleware)

	patientGroup.Get("/getPatientnData", func(c *fiber.Ctx) error {
		userID := c.Locals("userID").(string)

		patient, err := controller.GetPatientUserByID(userID)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": err.Error()})
		}

		return c.Status(200).JSON(fiber.Map{
			"donor":   patient,
			"message": "Patient user found successfully",
		})
	})

	patientGroup.Post("/postPatientSurvey", func(c *fiber.Ctx) error {
		userID := c.Locals("userID").(string)
		fmt.Println(userID)
		return controller.PostPatientSurvey(userID, c)
	})
}
