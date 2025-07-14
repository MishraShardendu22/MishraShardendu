package controller

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"os"

	"github.com/MishraShardendu22/chatbot/schema"
	"github.com/MishraShardendu22/chatbot/util"
	"github.com/gofiber/fiber/v2"
)

func DeepSeekRequest(c *fiber.Ctx) error {
	var body schema.RequestBody
	if err := c.BodyParser(&body); err != nil || body.Message == "" {
		return util.ResponseAPI(c, 400, "Invalid or empty message", nil, "Invalid input")
	}

	userID := body.UserID
	if userID == "" {
		return util.ResponseAPI(c, 400, "Missing user ID", nil, "Invalid input")
	}

	history, _ := util.GetAllMessages(userID)

	var messages []map[string]string

	messages = append(messages, map[string]string{
		"role":    "system",
		"content": schema.SystemPrompt,
	})

	for _, msg := range history {
		messages = append(messages, map[string]string{
			"role":    "user",
			"content": msg,
		})
	}

	messages = append(messages, map[string]string{
		"role":    "user",
		"content": body.Message,
	})

	requestPayload := map[string]any{
		"model":    "deepseek/deepseek-chat-v3-0324:free",
		"messages": messages,
	}
	jsonPayload, _ := json.Marshal(requestPayload)

	req, err := http.NewRequest("POST", "https://openrouter.ai/api/v1/chat/completions", bytes.NewBuffer(jsonPayload))
	if err != nil {
		return util.ResponseAPI(c, 500, "Failed to create request", nil, "Request error")
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+os.Getenv("DEEPSEEK_API_KEY"))
	req.Header.Set("X-Title", "Custom Chat Bot")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return util.ResponseAPI(c, 500, "Request failed", nil, "Network error")
	}
	defer resp.Body.Close()

	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return util.ResponseAPI(c, 500, "Failed to read response", nil, "Response read error")
	}

	var parsed map[string]any
	if err := json.Unmarshal(bodyBytes, &parsed); err != nil {
		return util.ResponseAPI(c, 500, "Invalid JSON from DeepSeek", nil, "Unmarshal error")
	}

	choices := parsed["choices"].([]any)
	first := choices[0].(map[string]any)
	message := first["message"].(map[string]any)
	content := message["content"].(string)

	util.StoreMessageRedis(userID, body.Message)
	util.StoreMessageRedis(userID, content)

	return util.ResponseAPI(c, 200, "Response received", content, "")
}
