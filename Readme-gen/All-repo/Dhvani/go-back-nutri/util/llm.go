package util

import (
	"encoding/json"
	"regexp"
	"strconv"

	"github.com/MishraShardendu22/models"
	"github.com/go-resty/resty/v2"
)

func LLM(diet string, openAI_API string) models.NutritionalData {
	messages := []map[string]any{
		{"role": "system", "content": models.SystemGrade},
		{"role": "user", "content": diet},
	}

	payload := map[string]any{
		"model":    "deepseek/deepseek-chat-v3-0324:free",
		"messages": messages,
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		panic("Error marshalling JSON: " + err.Error())
	}

	openAI_URL := "https://openrouter.ai/api/v1/chat/completions"

	client := resty.New()
	res, err := client.R().
		SetHeader("Content-Type", "application/json").
		SetHeader("Authorization", "Bearer "+openAI_API).
		SetBody(jsonData).
		Post(openAI_URL)
	if err != nil {
		panic("Error making request: " + err.Error())
	}
	if res.IsError() {
		panic("Error response from OpenRouter: " + res.String())
	}

	var llmResp models.LLMResponse
	if err := json.Unmarshal(res.Body(), &llmResp); err != nil {
		panic("Error unmarshalling response: " + err.Error())
	}
	if len(llmResp.Choices) == 0 {
		panic("No choices in response")
	}

	data := llmResp.Choices[0].Message.Content
	re := regexp.MustCompile(`\{[^}]+\}`)
	data = re.FindString(data)

	var raw map[string]interface{}
	if err := json.Unmarshal([]byte(data), &raw); err != nil {
		panic("Invalid JSON structure from LLM: " + err.Error())
	}

	return models.NutritionalData{
		Energy:              models.EnergyKJ(toFloat(raw["Energy"])),
		Sugars:              models.SugarGram(toFloat(raw["Sugars"])),
		Fibre:               models.FibreGram(toFloat(raw["Fibre"])),
		Protein:             models.ProteinGram(toFloat(raw["Protein"])),
		Fruits:              models.FruitsPercent(toFloat(raw["Fruits"])),
		Sodium:              models.SodiumMilligram(toFloat(raw["Sodium"])),
		SaturatedFattyAcids: models.SaturatedFattyAcidsGram(toFloat(raw["SaturatedFattyAcids"])),
	}
}

func toFloat(v interface{}) float64 {
	switch val := v.(type) {
	case float64:
		return val
	case bool:
		if val {
			return 1
		}
		return 0
	case string:
		f, _ := strconv.ParseFloat(val, 64)
		return f
	default:
		return 0
	}
}
