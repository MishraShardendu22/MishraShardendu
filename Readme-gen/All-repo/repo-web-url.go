package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

const username = "MishraShardendu22"
const outputFile1 = "repos_info.json"

type Repo struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Homepage    string `json:"homepage"`
	Fork        bool   `json:"fork"`
}

type RepoInfo struct {
	RepoName    string `json:"repo_name"`
	Description string `json:"description"`
	Website     string `json:"website"`
}

func repo_web_url() {
	url := fmt.Sprintf("https://api.github.com/users/%s/repos?per_page=100", username)

	resp, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	var repos []Repo
	if err := json.NewDecoder(resp.Body).Decode(&repos); err != nil {
		log.Fatal(err)
	}

	var results []RepoInfo
	for _, r := range repos {
		if r.Fork {
			continue
		}
		results = append(results, RepoInfo{
			RepoName:    r.Name,
			Description: r.Description,
			Website:     r.Homepage,
		})
	}

	file, err := os.Create(outputFile1)
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(results); err != nil {
		log.Fatal(err)
	}
}