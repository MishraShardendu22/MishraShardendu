package utils

import (
	"github.com/gofiber/fiber/v2"
)

// the ...string syntax is called a variadic parameter. 
// It allows the function to accept zero or more arguments of the specified type—in this case, string.

func ResponseAPI(c *fiber.Ctx, status int, message string, data any, token ...string) error {
	response := fiber.Map{
		"data":    data,
		"message": message,
	}

	if len(token) > 0 {
		response["token"] = token[0]
	}

	return c.Status(status).JSON(response)
}