package main

import (
	"fmt"
	"log"
	"os"

	"github.com/MishraShardendu22/ChatBot-Implementation/database"
	"github.com/MishraShardendu22/ChatBot-Implementation/route"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Println("This is a Customised Chat Bot Backend")

	app := fiber.New()

	// Load DotEnv only in non-production environments
	if os.Getenv("RUN_ENV") != "production" {
		if err := godotenv.Load(".env"); err != nil {
			log.Println("Warning: .env file not found or could not be loaded")
		}
	}

	// Retrieve environment variable
	test := os.Getenv("TEST")
	fmt.Println(test)

	// Connect To Database FIRST
	database.Connect()

	// Setup CORS Middleware
	SettingUpCors(app)

	// Define Routes (Use SetupRoutes instead of Routes)
	SetUpRoutes(app)

	// Get Port from ENV with a default value
	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "5000"
	}

	// Start Server and handle potential errors
	if err := app.Listen(":" + PORT); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}

// Setup CORS Middleware
func SettingUpCors(app *fiber.App) {
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowOrigins:     os.Getenv("CLIENT_URI"),
	}))
}

// Define Routes
func SetUpRoutes(app *fiber.App) {
	route.SetupAdminRoutes(app)
	route.SetupDonorRoutes(app)
	route.SetupPatientRoutes(app)
	route.SetupOraganisationRoutes(app)
	route.NormalChatRoutes(app)
}
