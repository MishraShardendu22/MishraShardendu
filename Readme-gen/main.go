package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

func sendJSON(url string, jsonData []byte, jwt string) error {
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return err
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+jwt)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode >= 300 {
		return fmt.Errorf("server responded with status %s", resp.Status)
	}
	return nil
}

func main() {
	url := "https://portfolio-backend-i96y.onrender.com/api/projects"
	jwt := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pc2hyYXNoYXJkZW5kdTIyQGdtYWlsLmNvbSIsImV4cCI6MTc1MjY1NTk1NiwiaWQiOiI2ODcxNzQyOTU4ZDk3N2MwOTgzMTZhNGUifQ.DUYlUyCH_AFqhExOrpc9fRiY1MowqWbZfMDeguQvyac"

var projects = []map[string]interface{}{
	
}




	for _, project := range projects {
		jsonData, err := json.Marshal(project)
		if err != nil {
			fmt.Println("Error marshaling project:", err)
			continue
		}

		err = sendJSON(url, jsonData, jwt)
		if err != nil {
			fmt.Println("Error sending project:", err)
		} else {
			fmt.Println("Project sent successfully:", project["project_name"])
		}
	}
}
