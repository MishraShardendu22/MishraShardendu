package util

import (
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/MishraShardendu22/models"
	"github.com/go-resty/resty/v2"
)

func TT(height int, weight int, bloodGroup string, gender string, openAI_API string) (any, error) {
	userPayload := `{"height":` + strconv.Itoa(height) +
		`,"weight":` + strconv.Itoa(weight) +
		`,"bloodGroup":"` + bloodGroup + `","gender":"` + gender + `"}`

	messages := []map[string]any{
		{"role": "system", "content": models.SystemDietPlan},
		{"role": "user", "content": userPayload},
	}

	payload := map[string]any{
		"model":    "deepseek/deepseek-chat-v3-0324:free",
		"messages": messages,
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return nil, fmt.Errorf("marshal payload: %w", err)
	}

	client := resty.New()
	res, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("Authorization", "Bearer "+openAI_API).
		SetBody(jsonData).
		Post("https://openrouter.ai/api/v1/chat/completions")

	if err != nil {
		return nil, fmt.Errorf("request error: %w", err)
	}

	if res.IsError() {
		return nil, fmt.Errorf("api error: %s", res.String())
	}

	var parsed map[string]any
	if err := json.Unmarshal(res.Body(), &parsed); err != nil {
		return nil, fmt.Errorf("unmarshal response: %w", err)
	}

	choices := parsed["choices"].([]any)
	first := choices[0].(map[string]any)
	message := first["message"].(map[string]any)
	content := message["content"].(string)

	return content, nil

}
