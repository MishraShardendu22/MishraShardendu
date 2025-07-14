package route

import (
	"github.com/MishraShardendu22/chatbot/controller"
	"github.com/gofiber/fiber/v2"
)

func RedisRoute(app *fiber.App){
	app.Delete("/clear", controller.ClearUserMessages)
	app.Get("/get", controller.GetUserMessages)
}