package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"

	"github.com/MishraShardendu22/go-backend/database"
	"github.com/MishraShardendu22/go-backend/routes"
	"github.com/MishraShardendu22/go-backend/util"
)

func main() {
	fmt.Println("This is My GSOC Project")

	app := fiber.New()

	LoadEnv()
	SetupCors(app)
	ConnectToDatabases()

	// Test Route

	Test(app)
	SetUpRoutes(app)

	// Test Route

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	log.Fatal(app.Listen(":" + port))
}

func SetupCors(app *fiber.App) {
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     os.Getenv("CLIENT_URI"),
		AllowMethods:     "GET, POST, PUT, DELETE, OPTIONS, PATCH",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
	}))
}

func LoadEnv() {
	if os.Getenv("RUN_ENV") != "production" {
		if err := godotenv.Load(".env"); err != nil {
			log.Println("Warning: .env file not found or could not be loaded")
		}
	}
}

func Test(app *fiber.App) {
	app.Get("/test321", func(c *fiber.Ctx) error {
		// Controller, Status, Message, Data, Token
		return utils.ResponseAPI(c, 200, "Test route working", "sample_data", "sample_token")
	})
}

func ConnectToDatabases() {
	MONGODB_URI := os.Getenv("MONGO_URL")
	database.ConnectToDatabase(MONGODB_URI)
}

func SetUpRoutes(app *fiber.App) {
	routes.SetUpUserRoutes(app)
}