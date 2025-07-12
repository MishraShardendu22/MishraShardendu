package main

import (
	"context"
	"log"
	"log/slog"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/MishraShardendu22/database"
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/route"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/joho/godotenv"
)

func loadConfig() *models.Config {
	config := &models.Config{
		Port:             util.GetEnv("PORT", "5000"),
		Environment:      util.GetEnv("ENVIRONMENT", "development"),
		CorsAllowOrigins: util.GetEnv("CORS_ALLOW_ORIGINS", "*"),
		LogLevel:         util.GetEnv("LOG_LEVEL", "info"),
		MONGODB_URI:      util.GetEnv("MONGODB_URI", "some_default_mongo_uri"),
		DbName:           util.GetEnv("DB_NAME", "test"),
		AdminPass:        util.GetEnv("ADMIN_PASS", ""),
		JWT_SECRET:       util.GetEnv("JWT_SECRET", ""),
	}
	return config
}

func setupLogger(config *models.Config) {
	var level slog.Level
	switch config.LogLevel {
	case "debug":
		level = slog.LevelDebug
	case "info":
		level = slog.LevelInfo
	case "warn":
		level = slog.LevelWarn
	case "error":
		level = slog.LevelError
	default:
		level = slog.LevelInfo
	}

	opts := &slog.HandlerOptions{
		Level:     level,
		AddSource: true,
	}

	handler := slog.NewJSONHandler(os.Stdout, opts)
	logger := slog.New(handler)
	slog.SetDefault(logger)
}

func setupMiddleware(app *fiber.App, config *models.Config) {
	app.Use(recover.New(recover.Config{
		EnableStackTrace: config.Environment == "development",
	}))

	app.Use(cors.New(cors.Config{
		AllowOrigins:  config.CorsAllowOrigins,
		AllowMethods:  "GET,POST,PUT,PATCH,DELETE,OPTIONS",
		AllowHeaders:  "Origin, Content-Type, Accept, Authorization",
		ExposeHeaders: "Content-Length",
		MaxAge:        86400,
	}))

	app.Use(logger.New(logger.Config{
		Format:     "[${time}] ${status} - ${latency} ${method} ${path}\n",
		TimeFormat: "2006-01-02 15:04:05",
		TimeZone:   "Local",
	}))
}

func gracefulShutdown(app *fiber.App, logger *slog.Logger) {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	<-quit
	logger.Info("Shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := app.ShutdownWithContext(ctx); err != nil {
		logger.Error("Server forced to shutdown", "error", err)
	}

	logger.Info("Server exited")
}

func init() {
	currEnv := "prod"

	if currEnv == "development" {
		if err := godotenv.Load(); err != nil {
			log.Printf("Warning: error loading .env file: %v", err)
		}
	}
}

func main() {
	config := loadConfig()
	if err := database.ConnectDatabase(config.DbName, config.MONGODB_URI); err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}

	setupLogger(config)
	logger := slog.Default()

	logger.Info("Starting Portfolio Backend",
		"environment", config.Environment,
		"port", config.Port,
		"log_level", config.LogLevel,
	)

	app := fiber.New(fiber.Config{
		AppName:      "Portfolio Backend",
		ServerHeader: "Portfolio-Backend",
		ReadTimeout:  30 * time.Second,
		WriteTimeout: 30 * time.Second,
		IdleTimeout:  120 * time.Second,
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			logger.Error("request error", slog.Group("req",
				slog.String("method", c.Method()),
				slog.String("path", c.Path()),
				slog.String("error", err.Error()),
			))

			code := fiber.StatusInternalServerError
			if e, ok := err.(*fiber.Error); ok {
				code = e.Code
			}

			return c.Status(code).JSON(fiber.Map{
				"error":   "Internal Server Error",
				"message": err.Error(),
			})
		},
	})

	setupMiddleware(app, config)

	SetUpRoutes(app, logger)

	go func() {
		logger.Info("Server starting", "port", config.Port)
		if err := app.Listen(":" + config.Port); err != nil {
			logger.Error("Server failed to start", "error", err)
			os.Exit(1)
		}
	}()

	gracefulShutdown(app, logger)
}

func SetUpRoutes(app *fiber.App, logger *slog.Logger) {
	config := loadConfig()

	route.SetupExpRoutes(app, config.JWT_SECRET)
	route.SetupSkillRoutes(app, config.JWT_SECRET)
	route.SetupProjectRoutes(app, config.JWT_SECRET)
	route.SetupCertificationRoutes(app, config.JWT_SECRET)
	route.SetupAdminRoutes(app, config.AdminPass, config.JWT_SECRET)

	app.Get("/api/test123", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Working fine",
		})
	})

	app.Get("/api/leetcode", FetchLeetCodeData)
	app.Get("/api/github", FetchGitHubProfile)
	app.Get("/api/github/commits", FetchGitHubCommits)
	app.Get("/api/github/languages", FetchGitHubLanguages)
	app.Get("/api/github/stars", FetchGitHubStars)
	app.Get("/api/github/top-repos", FetchTopStarredRepos)
	app.Get("/api/github/calendar", FetchContributionCalendar)
}
