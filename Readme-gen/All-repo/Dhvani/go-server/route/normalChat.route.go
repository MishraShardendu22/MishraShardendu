package route

import (
	"github.com/MishraShardendu22/ChatBot-Implementation/controller"
	"github.com/gofiber/fiber/v2"
)

func NormalChatRoutes(app *fiber.App) {
	app.Post("/chat", func(c *fiber.Ctx) error {
		var body map[string]interface{}
		if err := c.BodyParser(&body); err != nil {
			return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
		}
		query, ok := body["query"].(string)
		if !ok {
			return c.Status(400).JSON(fiber.Map{"error": "Query parameter missing"})
		}

		response, err := controller.Chat(query)
		if err != nil {
			return c.Status(404).JSON(fiber.Map{"error": err.Error()})
		}

		return c.Status(200).JSON(fiber.Map{
			"response": response,
		})
	})
}
