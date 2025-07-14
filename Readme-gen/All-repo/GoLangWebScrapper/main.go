package main


import (
   "encoding/csv"
   "fmt"
   "log"
   "os"

   "github.com/gocolly/colly"
)


type Book struct {
    Title string
    Price string
}

func main() {
	BooksScraper()
}

func BooksScraper() {
    fmt.Println("Start scraping")
    
	file, err := os.Create("export.csv")
    HandleError(err)
    defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()
    headers := []string{"Title", "Price"}
    writer.Write(headers)
    
	c := colly.NewCollector(
        colly.AllowedDomains("books.toscrape.com"),
    )

    c.OnHTML(".product_pod", func(e *colly.HTMLElement) {
        book := Book{}
        book.Title = e.ChildAttr(".image_container img", "alt")
        book.Price = e.ChildText(".price_color")
        row := []string{book.Title, book.Price}
        writer.Write(row)
    })

    c.OnHTML(".next a", func(e *colly.HTMLElement) {
        nextPage := e.Attr("href")
        c.Visit(e.Request.AbsoluteURL(nextPage))
    })

    c.OnResponse(func(r *colly.Response) {
        fmt.Println(r.StatusCode)
    })
    c.OnRequest(func(r *colly.Request) {
        fmt.Println("Visiting", r.URL)
    })
    c.Visit("https://books.toscrape.com/")
}

func HandleError(err error){
	if err != nil {
		fmt.Println("There was an Error In the Program")
		log.Fatal(err)
	}
}