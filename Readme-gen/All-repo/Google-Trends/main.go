package main

import (
	"encoding/xml"
	"fmt"
	"log"

	"github.com/MishraShardendu22/Data"
	"github.com/MishraShardendu22/Types"
)

func main() {
	DataResponse, err := data.GetData()
	if err != nil {
		log.Fatal(err)
	}

	// fmt.Println("Response: ", DataResponse.Body())
	// fmt.Println("Response Status Code:", DataResponse.Status())

	var rss types.RSS
	err = xml.Unmarshal(DataResponse.Body(), &rss)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Channel Title:", rss.Channel.Title)
	fmt.Println("Channel Description:", rss.Channel.Description)
	fmt.Println("Channel Link:", rss.Channel.Link)

	for i, item := range rss.Channel.Items {
		fmt.Printf("\nItem %d:\n", i+1)
		fmt.Println("Title:", item.Title)
		fmt.Println("Approx Traffic:", item.ApproxTraffic)
		fmt.Println("Link:", item.Link)
		fmt.Println("PubDate:", item.PubDate)
		fmt.Println("Image Src:", item.Picture)

		for j, news := range item.NewsItems {
			fmt.Printf("  NewsItem %d:\n", j+1)
			fmt.Println("  Title:", news.Title)
			fmt.Println("  URL:", news.URL)
			fmt.Println("  Picture:", news.Picture)
			fmt.Println("  Source:", news.Source)
		}
	}
}
