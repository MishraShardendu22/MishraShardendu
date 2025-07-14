package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"

	"github.com/gocolly/colly/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

type LinkRequest struct {
	URL string `json:"url"`
}

var csvFilePath = "WebScrape.csv"

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	fmt.Println("This is My News Aggregator Web Scraper Project!!")

	app := fiber.New()

	// Setting Up CORS to allow all origins
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PATCH,PUT,DELETE",
	}))

	TestRoutes(app)
	GetLinkRoute(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	log.Fatal(app.Listen(":" + port))
}

func TestRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{"message": "This is a Test Route"})
	})
}

func GetLinkRoute(app *fiber.App) {
	app.Post("/getLink", func(c *fiber.Ctx) error {
		var linkReq LinkRequest
		fmt.Println("Received The Link Request")
		err := c.BodyParser(&linkReq)
		if err != nil {
			return HandleError(err, c)
		}

		if err := WebScrapeRoute(linkReq.URL); err != nil {
			return HandleError(err, c)
		}

		// Serve the CSV file for download after scraping
		c.Set("Content-Type", "text/csv")
		c.Set("Content-Disposition", "attachment; filename=WebScrape.csv")
		return c.SendFile(csvFilePath)
	})
}

func WebScrapeRoute(url string) error {
	file, err := os.OpenFile(csvFilePath, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
	if err != nil {
		return err
	}
	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	// Write header
	header := []string{"Title", "Description", "Link To Article", "Publication Date", "Category", "Image URL"}
	if err := writer.Write(header); err != nil {
		return err
	}

	c := colly.NewCollector()

	c.OnXML("//item", func(e *colly.XMLElement) {
		title := e.ChildText("title")
		description := e.ChildText("description")
		link := e.ChildText("link")
		pubDate := e.ChildText("pubDate")
		category := e.ChildText("category")
		imageURL := e.ChildAttr("media:content", "url")

		row := []string{title, description, link, pubDate, category, imageURL}
		if err := writer.Write(row); err != nil {
			log.Println("Error writing to CSV:", err)
		}
	})

	c.OnResponse(func(r *colly.Response) {
		fmt.Println("Response received with status code:", r.StatusCode)
	})

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Visiting:", r.URL.String())
	})

	if err := c.Visit(url); err != nil {
		return err
	}
	return nil
}

func HandleError(err error, c *fiber.Ctx) error {
	log.Println(err)
	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Internal Server Error"})
}
