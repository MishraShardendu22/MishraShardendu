package controllers

import (
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func CloudinarySignature(c *fiber.Ctx) error {
	claims := c.Locals("user").(map[string]interface{})
	if claims["role"] != "admin" {
		return c.Status(403).JSON(fiber.Map{"error": "Forbidden"})
	}
	timestamp := strconv.FormatInt(time.Now().Unix(), 10)
	apiSecret := os.Getenv("CLOUDINARY_API_SECRET")
	params := fmt.Sprintf("timestamp=%s%s", timestamp, apiSecret)
	h := sha1.New()
	h.Write([]byte(params))
	signature := hex.EncodeToString(h.Sum(nil))
	return c.JSON(fiber.Map{
		"timestamp":  timestamp,
		"signature":  signature,
		"cloud_name": os.Getenv("CLOUDINARY_CLOUD_NAME"),
		"api_key":    os.Getenv("CLOUDINARY_API_KEY"),
	})
}
