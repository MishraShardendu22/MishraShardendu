package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os/exec"
)

const githubUser = "MishraShardendu22"

func Lang() {
	token := ""
	if token == "" {
		log.Fatal("Set GITHUB_TOKEN environment variable")
	}

	fmt.Println("Fetching repositories...")
	repos := getRepos1(githubUser, token)
	fmt.Printf("Found %d non-fork repositories\n", len(repos))

	langTotals := make(map[string]float64)
	var grandTotal float64

	for i, repo := range repos {
		fmt.Printf("[%d/%d] Fetching languages for repo: %s\n", i+1, len(repos), repo)
		langMap := getLanguages(repo, githubUser, token)
		for lang, bytes := range langMap {
			langTotals[lang] += bytes
			grandTotal += bytes
		}
	}

	fmt.Println("Calculating percentages...")
	for lang, bytes := range langTotals {
		percent := (bytes / grandTotal) * 100
		fmt.Printf("%s: %.2f%%\n", lang, percent)
	}
}

func getRepos1(user, token string) []string {
	url := fmt.Sprintf("https://api.github.com/users/%s/repos?per_page=100&type=owner", user)
	fmt.Println("GET", url)
	out := githubAPIRequest(url, token)
	var data []struct {
		Name string `json:"name"`
		Fork bool   `json:"fork"`
	}
	if err := json.Unmarshal(out, &data); err != nil {
		log.Fatal(err)
	}
	var repos []string
	for _, d := range data {
		if !d.Fork {
			repos = append(repos, d.Name)
		}
	}
	return repos
}

func getLanguages(repo, user, token string) map[string]float64 {
	url := fmt.Sprintf("https://api.github.com/repos/%s/%s/languages", user, repo)
	fmt.Println("GET", url)
	out := githubAPIRequest(url, token)
	var data map[string]float64
	if err := json.Unmarshal(out, &data); err != nil {
		log.Fatal(err)
	}
	return data
}

func githubAPIRequest(url, token string) []byte {
	cmd := exec.Command("curl", "-s", "-H", "Authorization: token "+token, url)
	out, err := cmd.Output()
	if err != nil {
		log.Fatal("curl failed:", err)
	}
	return out
}
