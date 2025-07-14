package main

import (
	"fmt"
	"log"
	"os"
	"sync"
	"time"

	"github.com/go-resty/resty/v2"
	"github.com/joho/godotenv"
)

func transferRepo(wg *sync.WaitGroup, client *resty.Client, originalUser, newUser, repo string) {
	defer wg.Done()
	url := "https://api.github.com/repos/" + originalUser + "/" + repo + "/transfer"

	fmt.Println("[START] Transferring:", repo)

	res, err := client.R().
		SetBody(map[string]string{
			"new_owner": newUser,
			"new_name":  repo,
		}).
		SetHeader("Accept", "application/vnd.github+json").
		SetHeader("Authorization", "Bearer "+os.Getenv("GITHUB_TOKEN_CLASSIC")).
		SetHeader("X-GitHub-Api-Version", "2022-11-28").
		Post(url)

	if err != nil {
		fmt.Println("[ERROR] "+repo+":", err)
		return
	}

	if res.StatusCode() != 202 {
		fmt.Println("[FAIL] "+repo+":", res.StatusCode(), "-", res.String())
	} else {
		fmt.Println("[SUCCESS] "+repo+":", res.Status())
	}
}

func main() {
	fmt.Println("Transferring repositories...")

	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	originalUser := "ShardenduMishra22"
	newUser := "MishraShardendu22"
	allRepos := []string{
		"Tinder-LLD",
		"Go-TransferScript",
		"Zepto-LLD",
		"DiscountCoupon-LLD",
		"PaymentGateway-LLD",
	}

	client := resty.New().
		SetRetryCount(3).
		SetRetryWaitTime(2 * time.Second).
		SetRetryMaxWaitTime(10 * time.Second).
		SetCloseConnection(true)

	var wg sync.WaitGroup

	for _, repo := range allRepos {
		wg.Add(1)
		go transferRepo(&wg, client, originalUser, newUser, repo)
	}

	wg.Wait()
}
