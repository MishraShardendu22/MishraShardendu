package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/MishraShardendu22/cal"
	"github.com/MishraShardendu22/models"
	"github.com/MishraShardendu22/score"
	"github.com/MishraShardendu22/util"
	"github.com/go-resty/resty/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

var OpenAI_KEY string
var server_url = "https://nutrition-calculator-server.onrender.com"

func main() {
	if os.Getenv("ENVIRONMENT") == "DEVELOPMENT" {
		if err := godotenv.Load(); err != nil {
			log.Fatal("error loading .env:", err)
		}
	}

	OpenAI_KEY = os.Getenv("OPENAI_KEY")

	if OpenAI_KEY == "" {
		log.Fatal("OPENAI_KEY not set")
	}

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:  "*",
		AllowMethods:  "GET,POST,PUT,DELETE,OPTIONS",
		AllowHeaders:  "Origin, Content-Type, Accept",
		ExposeHeaders: "Content-Length",
	}))

	app.Get("/test123", test)
	app.Post("/api/food", food)
	app.Post("/api/calculate-nutrition", calc)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3004"
	}

	log.Fatal(app.Listen(":" + port))
}

func calc(c *fiber.Ctx) error {
	var data models.NutritionalData
	if err := c.BodyParser(&data); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "invalid request data", nil, "")
	}

	if data.Fibre < 0 || data.Energy < 0 || data.Protein < 0 || data.Sugars < 0 ||
		data.Fruits < 0 || data.Sodium < 0 || data.SaturatedFattyAcids < 0 {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "required value is missing", nil, "")
	}

	ns := cal.Calculate(data, models.Food)
	grade := score.GetGrade(int(ns.Value))

	return util.ResponseAPI(c, fiber.StatusAccepted, "nutrition score calculated successfully", grade, "")
}

func test(c *fiber.Ctx) error {
	return util.ResponseAPI(c, fiber.StatusOK, "application is working", nil, "")
}

func food(c *fiber.Ctx) error {
	var payload map[string]string
	if err := c.BodyParser(&payload); err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "invalid request data", nil, "")
	}

	diet, ok := payload["diet"]
	if !ok || diet == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "diet cannot be empty", nil, "")
	}

	weight, ok := payload["weight"]
	if !ok || weight == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "weight cannot be empty", nil, "")
	}

	height, ok := payload["height"]
	if !ok || height == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "height cannot be empty", nil, "")
	}

	gender, ok := payload["gender"]
	if !ok || gender == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "gender cannot be empty", nil, "")
	}

	bloodGroup, ok := payload["bloodGroup"]
	if !ok || bloodGroup == "" {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "blood group cannot be empty", nil, "")
	}

	heightInt, err := strconv.Atoi(height)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "invalid height value", nil, "")
	}
	weightInt, err := strconv.Atoi(weight)
	if err != nil {
		return util.ResponseAPI(c, fiber.StatusBadRequest, "invalid weight value", nil, "")
	}

	type result struct {
		val string
		err error
	}

	nutriCh := make(chan result)
	ttCh := make(chan result)

	go func() {
		parsed := util.LLM(diet, OpenAI_KEY)
		parsedJSON, _ := json.Marshal(parsed)

		client := resty.New()
		res, err := client.R().
			SetHeader("Content-Type", "application/json").
			SetBody(parsedJSON).
			Post(server_url + "/api/calculate-nutrition")

		if err != nil {
			nutriCh <- result{"", err}
			return
		}
		if res.IsError() {
			nutriCh <- result{"", fiber.NewError(fiber.StatusInternalServerError, "error response from nutrition calculator")}
			return
		}

		nutriCh <- result{res.String(), nil}
	}()

	go func() {
		tt, err := util.TT(heightInt, weightInt, bloodGroup, gender, OpenAI_KEY)
		if err != nil {
			ttCh <- result{"", err}
			return
		}
		
		fmt.Println("Timetable response:", tt)

		ttStr, _ := tt.(string)
		ttCh <- result{ttStr, nil}
	}()

	nutriRes := <-nutriCh
	if nutriRes.err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, nutriRes.err.Error(), nil, "")
	}

	var parsed map[string]interface{}
	if err := json.Unmarshal([]byte(nutriRes.val), &parsed); err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "invalid JSON in response", nil, "")
	}

	grade, _ := parsed["data"].(string)

	ttRes := <-ttCh
	if ttRes.err != nil {
		return util.ResponseAPI(c, fiber.StatusInternalServerError, "failed to generate timetable", nil, "")
	}

	final := []string{grade, ttRes.val}
	return util.ResponseAPI(c, fiber.StatusOK, "food data processed successfully", final, "")
}