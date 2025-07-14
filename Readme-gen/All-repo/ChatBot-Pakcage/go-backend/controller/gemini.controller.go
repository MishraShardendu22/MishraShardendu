package controller

import (
	"context"
	"log"
	"os"

	"github.com/MishraShardendu22/chatbot/schema"
	"github.com/MishraShardendu22/chatbot/util"
	"github.com/gofiber/fiber/v2"
	"google.golang.org/genai"
)

func GeminiRequest(c *fiber.Ctx) error {
	var body schema.RequestBody
	if err := c.BodyParser(&body); err != nil || body.Message == "" || body.UserID == "" {
		log.Println("Invalid request body")
		return util.ResponseAPI(c, 400, "Invalid request body", nil, "Missing fields")
	}

	ctx := context.Background()
	client, err := genai.NewClient(ctx, &genai.ClientConfig{
		APIKey:  os.Getenv("GEMINI_API_KEY"),
		Backend: genai.BackendGeminiAPI,
	})
	if err != nil {
		log.Println("Gemini client init failed:", err)
		return util.ResponseAPI(c, 500, "Gemini client init failed", nil, "Client error")
	}

	history, _ := util.GetAllMessages(body.UserID)

	var fullPrompt string
	for _, msg := range history {
		fullPrompt += "User: " + msg + "\n"
	}
	fullPrompt += "User: " + body.Message + "\n"
	fullPrompt += "System: " + schema.SystemPrompt

	result, err := client.Models.GenerateContent(
		ctx,
		"gemini-2.0-flash",
		genai.Text(fullPrompt),
		nil,
	)
	if err != nil {
		log.Println("Gemini generation failed:", err)
		return util.ResponseAPI(c, 500, "Gemini generation failed", nil, "Gen error")
	}

	util.StoreMessageRedis(body.UserID, body.Message)
	util.StoreMessageRedis(body.UserID, result.Text())
	return util.ResponseAPI(c, 200, "Success", result.Text(), "")
}
