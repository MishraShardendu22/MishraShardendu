package util

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

type chatMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type chatRequest struct {
	Model    string        `json:"model"`
	Messages []chatMessage `json:"messages"`
}

type chatChoice struct {
	Message chatMessage `json:"message"`
}

type chatResponse struct {
	Choices []chatChoice `json:"choices"`
}

func Run(startD, endD, apiKey string) {
	in, err := ioutil.ReadFile("edited_commits.txt")
	if err != nil {
		log.Fatal(err)
	}

	systemPrompt := `You are a strict assistant for editing Git commit history.

Instructions:
- Input is a list of commits in the format:
  <hash>|<author>|<email>|<timestamp>|<message>
- Your task is to:
  1. Only update the timestamp (4th field) to a new value between ` + startD + ` and ` + endD + `.
  2. Rewrite the commit message to make it sound more professional, concise, and clear.
- Maintain realistic, uneven intervals between commit timestamps.
- Preserve the exact order of commits — do not reorder them.
- Do NOT modify the hash, author name, or email.
- Do NOT change the format — output must be in exact same format:
  <hash>|<author>|<email>|<new timestamp>|<updated professional message>
- Do NOT add any explanations, comments, or extra lines in the output.
`

	reqBody := chatRequest{
		Model: "openrouter/cypher-alpha:free",
		Messages: []chatMessage{
			{Role: "system", Content: systemPrompt},
			{Role: "user", Content: string(in)},
		},
	}

	b, err := json.Marshal(reqBody)
	if err != nil {
		log.Fatal(err)
	}

	req, err := http.NewRequest("POST", "https://openrouter.ai/api/v1/chat/completions", bytes.NewBuffer(b))
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apiKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	var cr chatResponse
	if err := json.Unmarshal(respBody, &cr); err != nil {
		log.Fatal(err)
	}

	if len(cr.Choices) == 0 {
		log.Fatalf("empty response from OpenRouter: %s", string(respBody))
	}

	lines := strings.Split(cr.Choices[0].Message.Content, "\n")
	var cleaned []string
	for _, l := range lines {
		if strings.Count(l, "|") == 4 {
			cleaned = append(cleaned, l)
		}
	}
	output := strings.Join(cleaned, "\n")

	if err := ioutil.WriteFile("updated_commits.txt", []byte(output), 0644); err != nil {
		log.Fatal(err)
	}
}

// package util

// import (
// 	"bufio"
// 	"fmt"
// 	"log"
// 	"os"
// 	"strings"
// 	"time"
// )

// var start string
// var end string

// func Run(startD string, endD string) {
// 	start = startD
// 	end = endD

// 	inFile := "edited_commits.txt"
// 	outFile := "updated_commits.txt"

// 	f, err := os.Open(inFile)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer f.Close()

// 	scanner := bufio.NewScanner(f)
// 	dates := generateDates(lenLines(inFile))
// 	idx := 0

// 	out, err := os.Create(outFile)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer out.Close()

// 	w := bufio.NewWriter(out)
// 	f.Seek(0, 0)
// 	scanner = bufio.NewScanner(f)
// 	for scanner.Scan() {
// 		line := scanner.Text()
// 		parts := strings.SplitN(line, "|", 5)
// 		newDate := dates[idx].Format("2006-01-02 15:04:05 +0530")
// 		msg := parts[4]
// 		newMsg := fmt.Sprintf("update: %s", strings.ToLower(msg))
// 		outLine := fmt.Sprintf("%s|%s|%s|%s|%s\n", parts[0], parts[1], parts[2], newDate, newMsg)
// 		w.WriteString(outLine)
// 		idx++
// 	}
// 	w.Flush()
// }

// func lenLines(path string) int {
// 	file, _ := os.Open(path)
// 	defer file.Close()
// 	s := bufio.NewScanner(file)
// 	count := 0
// 	for s.Scan() {
// 		count++
// 	}
// 	return count
// }

// func generateDates(n int) []time.Time {
// 	start, _ := time.Parse("2006-01-02 15:04:05 -0700", start)
// 	end, _ := time.Parse("2006-01-02 15:04:05 -0700", end)
// 	durations := end.Sub(start)
// 	steps := durations / time.Duration(n-1)
// 	dates := make([]time.Time, n)
// 	for i := 0; i < n; i++ {
// 		dates[i] = start.Add(time.Duration(i) * steps)
// 	}
// 	return dates
// }
