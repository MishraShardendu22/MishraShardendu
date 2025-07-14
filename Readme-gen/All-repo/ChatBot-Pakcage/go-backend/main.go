package main

import (
	"context"
	"crypto/tls"
	"fmt"
	"os"

	"github.com/MishraShardendu22/chatbot/controller"
	"github.com/MishraShardendu22/chatbot/route"
	"github.com/MishraShardendu22/chatbot/util"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
	"github.com/redis/go-redis/v9"
)

func main() {
	fmt.Println("This is Go backend for general purpose chatbot application using Gemini and DeepSeek APIs")

	if os.Getenv("ENVIRONMENT") != "production" {
		if err := godotenv.Load(); err != nil {
			fmt.Println("Error loading .env file")
		}
	}

	
	var Ctx = context.Background()

	var Rdb = redis.NewClient(&redis.Options{
		Addr:      os.Getenv("REDIS_URL"),
		Password:  os.Getenv("UPSTASH_PASSWORD"),
		DB:        0,
		TLSConfig: &tls.Config{},
	})
	
	util.Rdb = Rdb
	util.Ctx = Ctx

	controller.Rdb = Rdb
	controller.Ctx = Ctx
	
	pong, err := Rdb.Ping(Ctx).Result()
	if err != nil {
		fmt.Println("Redis connection failed:", err)
	} else {
		fmt.Println("Redis connected:", pong)
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     os.Getenv("CLIENT_URL"),
		AllowMethods:     "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	app.Get("/test", func(c *fiber.Ctx) error {
		return util.ResponseAPI(c, fiber.StatusOK, "Server is running", nil, "")
	})

	ImportRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "9001"
	}
	fmt.Printf("Server is running on port %s\n", port)
	if err := app.Listen(fmt.Sprintf(":%s", port)); err != nil {
		panic(err)
	}
}

func ImportRoutes(app *fiber.App) {
	route.DeepSeekRoute(app)
	route.GeminiRoute(app)
	route.RedisRoute(app)
}
