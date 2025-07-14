// controller.go
package controller

import (
	"fmt"

	"io"
	"net/http"
	"os"
	"strings"
)

func Chat(query string) (string, error) {
	url := "https://api.vectara.io/v2/chats"
	method := "POST"

	payload := strings.NewReader(fmt.Sprintf(`{
		"query": "%s",
    "search": {
      "corpora": [
        {
          "custom_dimensions": {},
          "lexical_interpolation": 0.025,
          "semantics": "default",
          "corpus_key": "medi-simple-chat"
        }
      ],
      "offset": 0,
      "limit": 10,
      "context_configuration": {
        "characters_before": 30,
        "characters_after": 30,
        "sentences_before": 3,
        "sentences_after": 3,
        "start_tag": "<em>",
        "end_tag": "</em>"
      },
      "reranker": {
        "type": "customer_reranker",
        "reranker_name": "Rerank_Multilingual_v1",
        "limit": 10,
        "cutoff": 0
      }
    },
    "generation": {
      "generation_preset_name": "vectara-summary-ext-v1.2.0",
      "max_used_search_results": 5,
      "prompt_template": "[\n  {\"role\": \"system\", \"content\": \"You are a helpful search assistant.\"},\n  #foreach ($qResult in $vectaraQueryResults)\n     {\"role\": \"user\", \"content\": \"Given the $vectaraIdxWord[$foreach.index] search result.\"},\n     {\"role\": \"assistant\", \"content\": \"${qResult.getText()}\" },\n  #end\n  {\"role\": \"user\", \"content\": \"Generate a summary for the query '${vectaraQuery}' based on the above results.\"}\n]\n",
      "max_response_characters": 300,
      "response_language": "auto",
      "model_parameters": {
        "max_tokens": 1024,
        "temperature": 0.7,
        "frequency_penalty": 0,
        "presence_penalty": 0
      },
      "citations": {
        "style": "none",
        "url_pattern": "https://vectara.com/documents/{doc.id}",
        "text_pattern": "{doc.title}"
      },
      "enable_factual_consistency_score": true
    },
    "chat": {
      "store": true
    },
    "save_history": true,
    "stream_response": false
  }`, query))

	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)
	if err != nil {
		return "", err
	}

	API_KEY := os.Getenv("API_KEY")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Accept", "application/json")
	req.Header.Add("x-api-key", API_KEY)

	res, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return "", err
	}
	return string(body), nil
}
