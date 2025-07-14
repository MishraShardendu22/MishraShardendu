package routes

import (
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/mongo"

	"github.com/MishraShardendu22/controllers"
)

func BlogRoutes(app *fiber.App, collections *mongo.Collection) {
	app.Post("/makeBlog", func(c *fiber.Ctx) error {
		return controllers.PostBlog(c, collections)
	})
	app.Delete("/deleteBlog", func(c *fiber.Ctx) error {
		return controllers.DeleteBlog(c, collections)
	})
	// app.Put("/editBlog/:id", func(c *fiber.Ctx) error {  
	// 	return controllers.EditBlog(c, collections)
	// })	
	app.Get("/getBlog", func(c *fiber.Ctx) error {
		return controllers.GetBlog(c, collections)
	})

}
