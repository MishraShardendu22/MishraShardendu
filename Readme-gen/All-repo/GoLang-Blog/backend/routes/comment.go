package routes

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/MishraShardendu22/controllers"
)

func CommentRoutes(app *fiber.App, collections *mongo.Collection) {
	app.Post("/makeComment", func(c *fiber.Ctx) error {
		return controllers.MakeComment(c, collections)
	})
	app.Post("/deleteComment", func(c *fiber.Ctx) error {
		return controllers.DeleteComment(c, collections)
	})
	app.Put("/editComment", func(c *fiber.Ctx) error {
		return controllers.EditComment(c, collections)
	})
	app.Get("/getComment", func(c *fiber.Ctx) error {
		return controllers.GetComment(c, collections)
	})

}
