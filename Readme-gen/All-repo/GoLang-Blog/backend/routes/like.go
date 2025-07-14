package routes

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/MishraShardendu22/controllers"
)

func LikeRoutes(app *fiber.App, collections *mongo.Collection) {
	app.Post("/like", func(c *fiber.Ctx) error {
		return controllers.LikePost(c, collections)
	})
	app.Post("/unlike", func(c *fiber.Ctx) error {
		return controllers.UnLikePost(c, collections)
	})
	app.Get("/likedPost/:userId", func(c *fiber.Ctx) error {
		return controllers.LikedPost(c, collections)
	})
	app.Get("/likes/:postId", func(c *fiber.Ctx) error {
		return controllers.GetLikes(c, collections)
	})
}
