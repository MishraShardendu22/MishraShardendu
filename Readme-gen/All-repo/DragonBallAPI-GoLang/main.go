package main

import (
	"fmt"
	"os"

	"github.com/ShardenduMishra22/DrStoneAPI/database"
	"github.com/ShardenduMishra22/DrStoneAPI/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
)

var collection *mongo.Collection

func main() {
	fmt.Println("This is a DrStone API")

	app := fiber.New()

	// Setting Up CORS to allow all origins
	SettingUpCORS(app)

	// Load environment variables
	loadEnvVariables()

	// Connect to the database Start
	collection = database.ConnectToDataBase()
	fmt.Println(collection)
	routes.SendToDataBase(collection)
	// Connect to the database End


	// Setting Up All Routes Start

	routes.SetupGetRoutes(app, collection)
	routes.SetupPostRoutes(app, collection)
	routes.SetupPutRoutes(app, collection)
	routes.SetupPatchRoutes(app, collection)
	routes.SetupDeleteRoutes(app, collection)

	// Setting Up All Routes End


	// Setup test routes
	TestRoute(app)

	// Start the server
	startServer(app)
}

func SettingUpCORS(app *fiber.App) {
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,PATCH,PUT,DELETE",
	}))
}

func loadEnvVariables() {
	if os.Getenv("ENV") != "production" {
		if err := godotenv.Load(".env"); err != nil {
			fmt.Println("Error loading .env file")
		}
	}
}

func TestRoute(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{"message": "This is a Sample Test Route for Dr. Stone API"})
	})
}

func startServer(app *fiber.App) {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	fmt.Println("Listening to port: " + port)
	if err := app.Listen("0.0.0.0:" + port); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
