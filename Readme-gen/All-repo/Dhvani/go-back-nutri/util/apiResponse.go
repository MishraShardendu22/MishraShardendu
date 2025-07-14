package util

import "github.com/gofiber/fiber/v2"

func ResponseAPI(c *fiber.Ctx, status int, message string, data any, token string) error {
	response := map[string]any{
		"status":  status,
		"message": message,
		"data":    data,
	}

	if token != "" {
		response["token"] = token
	}

	return c.Status(status).JSON(response)
}