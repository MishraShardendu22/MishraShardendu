package controller

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"

	"github.com/MishraShardendu22/ChatBot-Implementation/database"
	"github.com/MishraShardendu22/ChatBot-Implementation/model"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Donor model.Donor

func GetDonorUserByID(id string) (*Donor, error) {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid ObjectID: %v", err)
	}

	collection := database.Client.Database("bloodbank").Collection("donors")
	filter := bson.M{"_id": objectID}

	var donor Donor
	err = collection.FindOne(context.Background(), filter).Decode(&donor)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, fmt.Errorf("no admin found with id: %s", id)
		}
		return nil, fmt.Errorf("failed to find admin: %v", err)
	}

	return &donor, nil
}

func PostDonorSurvey(id string, c *fiber.Ctx) error {
	var survey model.Survey
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid DonorID"})
	}
	survey.DonorID = objectID

	if err := c.BodyParser(&survey); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	collection := database.Client.Database("bloodbank").Collection("donorSurvey")
	entry, err := collection.InsertOne(context.Background(), survey)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	surveyJSON, err := json.Marshal(survey)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to marshal survey"})
	}

	url := "https://api.vectara.io/v2/corpora/medi-simple-chat/upload_file"
	method := "POST"

	payload := &bytes.Buffer{}
	writer := multipart.NewWriter(payload)


	if err := writer.WriteField("filename", "survey.json"); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	part, err := writer.CreateFormFile("file", "survey.json")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to create form file"})
	}

	_, err = part.Write(surveyJSON)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to write JSON content"})
	}

	err = writer.Close()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to close writer"})
	}

	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to create HTTP request"})
	}

	API_KEY := os.Getenv("API_KEY")
	req.Header.Set("Content-Type", writer.FormDataContentType())
	req.Header.Add("Accept", "application/json")
	req.Header.Add("x-api-key", API_KEY)

	res, err := client.Do(req)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to execute HTTP request"})
	}
	defer res.Body.Close()

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "failed to read response"})
	}
	fmt.Println(string(body))
	
	return c.Status(200).JSON(fiber.Map{
		"message": "Survey added successfully",
		"entry":   entry,
	})
}
