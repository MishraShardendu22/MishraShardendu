# Google Trends RSS Feed Parser

A Go CLI tool to fetch and parse trending search topics from Google Trends (RSS format). Displays trend details including headlines and traffic estimates.

## Folder Structure

```

Google-Trends/
├── Data/                 # Contains HTTP request logic (GetData function)
│   └── Data.go
├── Types/                # Struct definitions for XML parsing
│   └── Types.go
├── .env                  # (Optional) Environment variables
├── go.mod                # Go module definition
├── go.sum
├── main.go               # Entry point
├── README.md             # This file

````

## Features

- Uses `req` package for HTTP client
- Parses Google Trends XML feed
- Displays:
  - Trend title
  - Traffic estimate
  - Article links and headlines
  - News source and images

## Requirements

- Go 1.18+
- Internet connection (to fetch live RSS)

## Run

```bash
go run main.go
````

## Example Output

```
Channel Title: Daily Search Trends
Channel Description: Top trending search topics in India
Channel Link: https://trends.google.com/trends/trendingsearches/daily/rss?geo=IN

Item 1:
Title: SL vs BAN
Approx Traffic: 200K+
Link: https://www.google.com/search?q=SL+vs+BAN
  NewsItem 1:
  Title: श्रीलंका बनाम बांग्लादेश...
  URL: https://www.example.com/article.html
  Picture: https://encrypted-image.jpg
  Source: ESPN
...
```