package routes

import (
	"github.com/MishraShardendu22/go-backend/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetUpUserRoutes(app *fiber.App) {
	userGroup := app.Group("/api/user") 

	userGroup.Post("/register", controllers.RegisterUser)
}