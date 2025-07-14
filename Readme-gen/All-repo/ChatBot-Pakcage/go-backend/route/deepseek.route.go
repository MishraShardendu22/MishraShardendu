package route

import (
	"github.com/MishraShardendu22/chatbot/controller"
	"github.com/gofiber/fiber/v2"
)

func DeepSeekRoute(app *fiber.App){
	app.Post("/deepseek", func(c *fiber.Ctx) error {
		return controller.DeepSeekRequest(c)
	})
}