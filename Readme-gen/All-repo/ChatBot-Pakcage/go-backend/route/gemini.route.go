package route

import (
	"github.com/MishraShardendu22/chatbot/controller"
	"github.com/gofiber/fiber/v2"
)

func GeminiRoute(app *fiber.App){
	app.Post("/gemini", func(c *fiber.Ctx) error {
		return controller.GeminiRequest(c)
	})
}