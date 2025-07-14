package main

import (
	"fmt"
	"log"
	"os"

	"github.com/MishraShardendu22/database"
	"github.com/MishraShardendu22/routes"

	// "github.com/MishraShardendu22/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
)

var collections *mongo.Collection

func main() {
	fmt.Println("This is a Blog application")

	app := fiber.New()
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Start Server
	StartServer(app)

	// // // // TESTING PLEASE IGNORE // // // //
	// recipient := "shardendumishra02@gmail.com"
	// otp := 123456
	// utils.SendEmailFast(recipient, otp)
	// // // // TESTING PLEASE IGNORE // // // //

	// Listening To CORS
	SettingUpCORS(app)

	// Connecting To Database
	collections = database.Connect()
	SetUpRoutes(app, collections)

	port := os.Getenv("PORT")
	fmt.Println("Listening to port: " + port)
	if err := app.Listen("0.0.0.0:" + port); err != nil {
		fmt.Println("Error starting server:", err)
	}
}

func SetUpRoutes(app *fiber.App, collections *mongo.Collection) {
	// Signup Route
	routes.SignupRoutes(app, collections)

	// Otp Route
	routes.OTPRoutes(app, collections)

	// Login Route
	routes.LoginRoutes(app, collections)

	// Like Route
	routes.LikeRoutes(app, collections)

	// Blog Route
	routes.BlogRoutes(app, collections)

	// Comment Route
	routes.CommentRoutes(app, collections)
}

func SettingUpCORS(app *fiber.App) {
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowMethods: "GET, POST, PUT, PATCH, DELETE",
	}))
}

func StartServer(app *fiber.App) {
	fmt.Println("Server is starting")
	app.Get("/", SayHello)
}

func SayHello(c *fiber.Ctx) error {
	return c.SendString("Server Started !!")
}
