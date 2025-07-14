package routes

import (
	"github.com/MishraShardendu22/controllers"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"
)

func LoginRoutes(app *fiber.App, collections *mongo.Collection) {
	app.Post("/login", func(c *fiber.Ctx) error {
		return controllers.LoginHandler(c, collections)
	})
}
