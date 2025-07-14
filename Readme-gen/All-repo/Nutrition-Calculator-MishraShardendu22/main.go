package main

import (
	"log"

	"github.com/MishraShardendu22/cal"
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/score"
	"github.com/MishraShardendu22/util"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	defer app.Shutdown()

	app.Use(cors.New(cors.Config{
		AllowOrigins:  "*",
		AllowMethods:  "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:  "Origin, Content-Type, Accept",
		ExposeHeaders: "Content-Length",
	}))

	app.Get("/test123", func(c *fiber.Ctx) error {
		return util.ResponseAPI(c, fiber.StatusOK, "Application is Working", nil, "")
	})

	app.Post("/api/nutrition", func(c *fiber.Ctx) error {
		var data models.NutritionalData
		err := c.BodyParser(&data)

		if err != nil {
			return util.ResponseAPI(c, fiber.StatusBadRequest, "Invalid request data", nil, "")
		}

		if data.Fibre == 0 || data.Energy == 0 || data.Protein == 0 || data.Sugars == 0 || data.Fruits == 0 || data.Sodium == 0 || data.SaturatedFattyAcids == 0 {
			return util.ResponseAPI(c, fiber.StatusBadRequest, "Required value is missing", nil, "")
		}

		st := models.Food
		ns := cal.Calculate(data, st)
		grade := score.GetGrade(ns.Value)

		return util.ResponseAPI(c, fiber.StatusAccepted, "Nutrition score calculated successfully", grade, "")
	})

	if err := app.Listen(":3000"); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
