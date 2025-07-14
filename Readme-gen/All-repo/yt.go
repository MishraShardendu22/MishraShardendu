package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
)

const apiKey = ""
const channelId = ""
const outputFile2 = "yt_videos.json"

type YTResponse struct {
	Items []struct {
		Snippet struct {
			Title       string `json:"title"`
			Description string `json:"description"`
			ResourceID  struct {
				VideoID string `json:"videoId"`
			} `json:"resourceId"`
		} `json:"snippet"`
	} `json:"items"`
}

type ChannelDetails struct {
	Items []struct {
		ContentDetails struct {
			RelatedPlaylists struct {
				Uploads string `json:"uploads"`
			} `json:"relatedPlaylists"`
		} `json:"contentDetails"`
	} `json:"items"`
}

type VideoInfo struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	URL         string `json:"url"`
}

func yt() {
	// Get uploads playlist ID
	channelURL := fmt.Sprintf("https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=%s&key=%s", channelId, apiKey)
	resp, err := http.Get(channelURL)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	var channelData ChannelDetails
	if err := json.NewDecoder(resp.Body).Decode(&channelData); err != nil {
		log.Fatal(err)
	}
	if len(channelData.Items) == 0 {
		log.Fatal("No channel data found")
	}
	playlistId := channelData.Items[0].ContentDetails.RelatedPlaylists.Uploads

	// Fetch videos from playlist
	playlistURL := fmt.Sprintf("https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=%s&key=%s", playlistId, apiKey)
	resp, err = http.Get(playlistURL)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()

	var ytResp YTResponse
	if err := json.NewDecoder(resp.Body).Decode(&ytResp); err != nil {
		log.Fatal(err)
	}

	var results []VideoInfo
	for _, item := range ytResp.Items {
		results = append(results, VideoInfo{
			Title:       item.Snippet.Title,
			Description: item.Snippet.Description,
			URL:         fmt.Sprintf("https://www.youtube.com/watch?v=%s", item.Snippet.ResourceID.VideoID),
		})
	}

	// Write to JSON
	file, err := os.Create(outputFile2)
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