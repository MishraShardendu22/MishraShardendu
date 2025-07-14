package main

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"os"
	"sort"
	"sync"
	"time"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/sync/semaphore"
)

var httpClient = &http.Client{Timeout: 10 * time.Second}
var maxWorkers = int64(15)

type RepoInfo struct {
	Name            string `json:"name"`
	Fork            bool   `json:"fork"`
	LanguagesURL    string `json:"languages_url"`
	StargazersCount int    `json:"stargazers_count"`
	HTMLURL         string `json:"html_url"`
}

func fetchRepos(token, user string) ([]RepoInfo, error) {
	req, _ := http.NewRequest("GET", "https://api.github.com/users/"+user+"/repos?per_page=100", nil)
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("User-Agent", "fiber-backend")
	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var repos []RepoInfo
	body, _ := io.ReadAll(resp.Body)
	if err := json.Unmarshal(body, &repos); err != nil {
		return nil, err
	}
	return repos, nil
}

func FetchLeetCodeData(c *fiber.Ctx) error {
	query := `{
		matchedUser(username: "ShardenduMishra22") {
			profile {
				realName
				userAvatar
				ranking
			}
			submitStats {
				acSubmissionNum {
					difficulty
					count
				}
			}
		}
	}`

	payload := map[string]string{"query": query}
	body, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", "https://leetcode.com/graphql", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Referer", "https://leetcode.com")

	resp, err := httpClient.Do(req)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "request_failed"})
	}
	defer resp.Body.Close()

	respBody, _ := io.ReadAll(resp.Body)
	var jsonResponse map[string]interface{}
	if err := json.Unmarshal(respBody, &jsonResponse); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "invalid_response"})
	}

	return c.JSON(jsonResponse)
}

func FetchGitHubProfile(c *fiber.Ctx) error {
	token := os.Getenv("GITHUB_TOKEN")
	username := "MishraShardendu22"
	url := "https://api.github.com/users/" + username

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("User-Agent", "fiber-backend")

	resp, err := httpClient.Do(req)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "request_failed"})
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var data map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "invalid_response"})
	}

	return c.JSON(data)
}

func FetchGitHubCommits(c *fiber.Ctx) error {
	token := os.Getenv("GITHUB_TOKEN")
	username := "MishraShardendu22"
	since := "2024-07-01T00:00:00Z"

	repos, err := fetchRepos(token, username)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "repo_fetch_failed"})
	}

	counts := make(map[string]int)
	mu := sync.Mutex{}
	sem := semaphore.NewWeighted(maxWorkers)
	var wg sync.WaitGroup

	for _, repo := range repos {
		if repo.Fork {
			continue
		}
		wg.Add(1)
		sem.Acquire(context.Background(), 1)
		go func(name string) {
			defer wg.Done()
			defer sem.Release(1)

			url := "https://api.github.com/repos/" + username + "/" + name + "/commits?since=" + since + "&per_page=100"
			req, _ := http.NewRequest("GET", url, nil)
			req.Header.Set("Authorization", "Bearer "+token)
			req.Header.Set("User-Agent", "fiber-backend")
			resp, err := httpClient.Do(req)
			if err != nil {
				return
			}
			defer resp.Body.Close()

			var commits []struct {
				Commit struct {
					Author struct{ Date string } `json:"author"`
				} `json:"commit"`
			}
			body, _ := io.ReadAll(resp.Body)
			if json.Unmarshal(body, &commits) != nil {
				return
			}
			mu.Lock()
			for _, cm := range commits {
				day := cm.Commit.Author.Date[:10]
				counts[day]++
			}
			mu.Unlock()
		}(repo.Name)
	}
	wg.Wait()

	var result []map[string]interface{}
	for date, count := range counts {
		result = append(result, map[string]interface{}{"date": date, "count": count})
	}
	sort.Slice(result, func(i, j int) bool {
		return result[i]["date"].(string) < result[j]["date"].(string)
	})

	return c.JSON(result)
}

func FetchGitHubLanguages(c *fiber.Ctx) error {
	token := os.Getenv("GITHUB_TOKEN")
	username := "MishraShardendu22"

	repos, err := fetchRepos(token, username)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "repo_fetch_failed"})
	}

	langStats := make(map[string]int)
	mu := sync.Mutex{}
	sem := semaphore.NewWeighted(maxWorkers)
	var wg sync.WaitGroup

	for _, repo := range repos {
		if repo.Fork {
			continue
		}
		wg.Add(1)
		sem.Acquire(context.Background(), 1)
		go func(url string) {
			defer wg.Done()
			defer sem.Release(1)

			req, _ := http.NewRequest("GET", url, nil)
			req.Header.Set("Authorization", "Bearer "+token)
			req.Header.Set("User-Agent", "fiber-backend")
			resp, err := httpClient.Do(req)
			if err != nil {
				return
			}
			defer resp.Body.Close()

			var langs map[string]int
			body, _ := io.ReadAll(resp.Body)
			if json.Unmarshal(body, &langs) != nil {
				return
			}
			mu.Lock()
			for lang, bytes := range langs {
				langStats[lang] += bytes
			}
			mu.Unlock()
		}(repo.LanguagesURL)
	}
	wg.Wait()
	return c.JSON(langStats)
}

func FetchGitHubStars(c *fiber.Ctx) error {
	token := os.Getenv("GITHUB_TOKEN")
	username := "MishraShardendu22"

	repos, err := fetchRepos(token, username)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "repo_fetch_failed"})
	}

	total := 0
	for _, repo := range repos {
		total += repo.StargazersCount
	}
	return c.JSON(fiber.Map{"stars": total})
}

func FetchTopStarredRepos(c *fiber.Ctx) error {
	token := os.Getenv("GITHUB_TOKEN")
	username := "MishraShardendu22"

	repos, err := fetchRepos(token, username)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "repo_fetch_failed"})
	}

	sort.Slice(repos, func(i, j int) bool {
		return repos[i].StargazersCount > repos[j].StargazersCount
	})

	top := []map[string]interface{}{}
	for i, r := range repos {
		if i >= 6 {
			break
		}
		top = append(top, map[string]interface{}{
			"name":  r.Name,
			"url":   r.HTMLURL,
			"stars": r.StargazersCount,
		})
	}

	return c.JSON(top)
}

func FetchContributionCalendar(c *fiber.Ctx) error {
	username := "MishraShardendu22"
	url := "https://github-contributions-api.jogruber.de/v4/" + username

	resp, err := httpClient.Get(url)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "calendar_fetch_failed"})
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var data map[string]interface{}
	json.Unmarshal(body, &data)

	return c.JSON(data)
}
