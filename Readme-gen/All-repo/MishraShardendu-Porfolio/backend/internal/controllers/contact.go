package controllers

import (
	"fmt"
	"net/smtp"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
)

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func Contact(c *fiber.Ctx) error {
	var req ContactRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if req.Name == "" || req.Email == "" || req.Message == "" {
		return c.Status(400).JSON(fiber.Map{"error": "All fields required"})
	}
	to := os.Getenv("ADMIN_EMAIL")
	from := os.Getenv("SMTP_USER")
	pass := os.Getenv("SMTP_PASS")
	host := os.Getenv("SMTP_HOST")
	port := os.Getenv("SMTP_PORT")
	portInt, _ := strconv.Atoi(port)
	msg := []byte(fmt.Sprintf("Subject: Portfolio Contact Form\r\nFrom: %s\r\nTo: %s\r\n\r\nName: %s\nEmail: %s\nMessage: %s", req.Email, to, req.Name, req.Email, req.Message))
	err := smtp.SendMail(fmt.Sprintf("%s:%d", host, portInt), smtp.PlainAuth("", from, pass, host), from, []string{to}, msg)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to send email"})
	}
	return c.JSON(fiber.Map{"success": true})
}
