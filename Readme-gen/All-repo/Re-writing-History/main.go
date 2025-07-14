package main

import (
	"log"
	"os"

	"github.com/MishraShardendu22/util"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {

	apiKey := os.Getenv("API_KEY")
	if apiKey == "" {
		log.Fatal("API_KEY environment variable is not set. Please set it in your environment or .env file.")
	}

	repo := "MishraShardendu22"
	start := "2024-09-19 00:00:00 +0530"
	end := "2025-06-30 23:59:59 +0530"

	// 1. Clone the repo and generate edited_commits.txt
	util.Clone("https://github.com/MishraShardendu22/" + repo + ".git")

	// 2. Run AI to generate updated_commits.txt
	util.Run(start, end, apiKey)

	// 3. Edit commit history and push
	util.Edit(repo)
}
