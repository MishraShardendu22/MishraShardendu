package data

import (
	"fmt"

	"github.com/go-resty/resty/v2"
)

func GetData() (*resty.Response, error) {
	fmt.Println("Google Trends!")
	url := "https://trends.google.com/trending/rss?geo=IN"

	client := resty.New()

	res, err := client.R().
		EnableTrace().
		Get(url)

	if err != nil {
		return nil, err
	}	

	trace := res.Request.TraceInfo()
	fmt.Println("DNS Lookup:", trace.DNSLookup)
	fmt.Println("TCP Connection:", trace.ConnTime)
	fmt.Println("TLS Handshake:", trace.TLSHandshake)
	fmt.Println("Server Time:", trace.ServerTime)
	fmt.Println("Response Time:", trace.ResponseTime)
	fmt.Println("Total Time:", trace.TotalTime)

	return res, nil
}
