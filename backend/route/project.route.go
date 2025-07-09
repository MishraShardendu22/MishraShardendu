package route

import (
	"github.com/MishraShardendu22/controller"
	"github.com/MishraShardendu22/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupProjectRoutes(app *fiber.App, secret string) {
	app.Get("/api/projects", middleware.JWTMiddleware(secret), controller.GetProjects)
	app.Post("/api/projects", middleware.JWTMiddleware(secret), controller.AddProjects)
	app.Get("/api/projects/:id", middleware.JWTMiddleware(secret), controller.GetProjectByID)
	app.Put("/api/projects/:id", middleware.JWTMiddleware(secret), controller.UpdateProjects)
	app.Delete("/api/projects/:id", middleware.JWTMiddleware(secret), controller.RemoveProjects)
}
