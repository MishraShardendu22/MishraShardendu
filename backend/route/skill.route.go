package route

import (
	"github.com/MishraShardendu22/controller"
	"github.com/MishraShardendu22/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetupSkillRoutes(app *fiber.App,secret string) {
	app.Get("/api/skills",middleware.JWTMiddleware(secret), controller.GetSkills)
	app.Post("/api/skills",middleware.JWTMiddleware(secret) ,controller.AddSkills)
}
