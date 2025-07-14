package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
)

type Repo1 struct {
	FullName string `json:"full_name"`
	Fork     bool   `json:"fork"`
}

func main() {

	username := "Team-Parashuram"
	page := 1

	for {
		url := fmt.Sprintf("https://api.github.com/orgs/%s/repos?per_page=100&page=%d", username, page)
		resp, err := http.Get(url)
		if err != nil {
			panic(err)
		}
		defer resp.Body.Close()

		body, _ := io.ReadAll(resp.Body)
		var repos []Repo1
		if err := json.Unmarshal(body, &repos); err != nil {
			panic(err)
		}
		if len(repos) == 0 {
			break
		}

		for _, repo := range repos {
			if repo.Fork {
				continue
			}
			sshURL := fmt.Sprintf("git@github.com:%s.git", repo.FullName)
			fmt.Println("Cloning:", sshURL)
			cmd := exec.Command("git", "clone", sshURL)
			cmd.Stdout = os.Stdout
			cmd.Stderr = os.Stderr
			_ = cmd.Run()
		}
		page++
	}
}
