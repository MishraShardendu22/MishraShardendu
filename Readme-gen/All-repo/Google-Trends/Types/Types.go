package types

type RSS struct {
	Channel Channel `xml:"channel"`
}

type Channel struct {
	Title       string `xml:"title"`
	Description string `xml:"description"`
	Link        string `xml:"link"`
	Items       []Item `xml:"item"`
}

type Item struct {
	Title         string     `xml:"title"`
	ApproxTraffic string     `xml:"approx_traffic"`
	Link          string     `xml:"link"`
	PubDate       string     `xml:"pubDate"`
	Picture       string     `xml:"picture"`
	PictureSource string     `xml:"picture_source"`
	NewsItems     []NewsItem `xml:"news_item"`
}

type NewsItem struct {
	Title   string `xml:"news_item_title"`
	URL     string `xml:"news_item_url"`
	Picture string `xml:"news_item_picture"`
	Source  string `xml:"news_item_source"`
}
