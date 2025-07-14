package routes

import (
	"github.com/MishraShardendu22/controllers"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func OTPRoutes(app *fiber.App, collections *mongo.Collection) {
	app.Post("/checkotp", func(c *fiber.Ctx) error {
		return controllers.CheckOTPHandler(c, collections)
	})
}
