package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/spf13/cobra"
)

var url string

func main() {
	RootCommand.Execute()
}

var RootCommand = &cobra.Command{
	Use:   "checker",
	Short: "Website Health Checker",
	Long:  "This tool checks if a website is up or down.",
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Use 'checker check --url <website>' to check a website's health.")
	},
}

var CheckCommand = &cobra.Command{
	Use:   "check",
	Short: "Check Website Health",
	Long:  "Checks if the specified website is up or down.",
	Run: func(cmd *cobra.Command, args []string) {
		checkWebsite(url)
	},
}

func init() {
	CheckCommand.Flags().StringVarP(&url, "url", "u", "", "URL of the website to check")
	CheckCommand.MarkFlagRequired("url")
	RootCommand.AddCommand(CheckCommand)
}

// Better Logic
func checkWebsite(url string) {
	start := time.Now()
	resp, err := http.Get(url)
	duration := time.Since(start)

	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusOK && duration < 2*time.Second { // threshold of 2 seconds
		fmt.Printf("Website is up: %s (Response time: %v)\n", url, duration)
	} else {
		fmt.Printf("Website is down: %s (Status Code: %d, Response time: %v)\n", url, resp.StatusCode, duration)
	}
}

// func checkWebsite(url string) {
// 	resp, err := http.Get(url)
// 	if err != nil {
// 		fmt.Println("Error:", err)
// 		return
// 	}
// 	defer resp.Body.Close()

// 	if resp.StatusCode == http.StatusOK {
// 		fmt.Println("Website is up:", url)
// 	} else {
// 		fmt.Printf("Website is down: %s (Status Code: %d)\n", url, resp.StatusCode)
// 	}
// }
