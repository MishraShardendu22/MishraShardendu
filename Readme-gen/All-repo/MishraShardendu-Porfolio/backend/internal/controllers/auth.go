package controllers

import (
	"os"
	"strings"
	"time"

	"github.com/MishraShardendu/portfolio-backend/internal/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

type AuthRequest struct {
	Email     string `json:"email"`
	Password  string `json:"password"`
	AdminPass string `json:"adminPass,omitempty"`
}

type AuthResponse struct {
	Token string       `json:"token"`
	User  *models.User `json:"user"`
}

func Register(c *fiber.Ctx) error {
	var req AuthRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	if req.Email == "" || req.Password == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Email and password required"})
	}
	adminEmail := os.Getenv("ADMIN_EMAIL")
	adminPass := os.Getenv("ADMIN_PASS")
	if req.Email == adminEmail {
		if req.AdminPass == "" {
			return c.Status(400).JSON(fiber.Map{"error": "Admin pass required"})
		}
		if req.AdminPass != adminPass {
			return c.Status(403).JSON(fiber.Map{"error": "Invalid admin pass"})
		}
	}
	// Check if user exists
	existing := &models.User{}
	err := mgm.Coll(existing).First(bson.M{"email": strings.ToLower(req.Email)}, existing)
	if err == nil {
		return c.Status(409).JSON(fiber.Map{"error": "User already exists"})
	}
	// Hash password
	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to hash password"})
	}
	user := &models.User{
		Email:    strings.ToLower(req.Email),
		Password: string(hash),
		Role:     "user",
	}
	if req.Email == adminEmail {
		user.Role = "admin"
	}
	if err := mgm.Coll(user).Create(user); err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create user"})
	}
	return issueJWT(c, user)
}

func Login(c *fiber.Ctx) error {
	var req AuthRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid request"})
	}
	user := &models.User{}
	err := mgm.Coll(user).First(bson.M{"email": strings.ToLower(req.Email)}, user)
	if err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		return c.Status(401).JSON(fiber.Map{"error": "Invalid credentials"})
	}
	return issueJWT(c, user)
}

func issueJWT(c *fiber.Ctx, user *models.User) error {
	secret := os.Getenv("JWT_SECRET")
	claims := jwt.MapClaims{
		"sub":   user.ID.Hex(),
		"email": user.Email,
		"role":  user.Role,
		"exp":   time.Now().Add(7 * 24 * time.Hour).Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := token.SignedString([]byte(secret))
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to sign token"})
	}
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    signed,
		HTTPOnly: true,
		Secure:   true,
		SameSite: "Strict",
		Path:     "/",
		Expires:  time.Now().Add(7 * 24 * time.Hour),
	})
	return c.JSON(AuthResponse{Token: signed, User: user})
}

func Me(c *fiber.Ctx) error {
	claims := c.Locals("user")
	if claims == nil {
		return c.Status(401).JSON(fiber.Map{"error": "Unauthorized"})
	}
	return c.JSON(claims)
}

func Logout(c *fiber.Ctx) error {
	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    "",
		HTTPOnly: true,
		Secure:   true,
		SameSite: "Strict",
		Path:     "/",
		Expires:  time.Now().Add(-1 * time.Hour),
	})
	return c.JSON(fiber.Map{"success": true})
}

func AdminExists(c *fiber.Ctx) error {
	admin := &models.User{}
	err := mgm.Coll(admin).First(bson.M{"role": "admin"}, admin)
	if err == nil {
		return c.JSON(fiber.Map{"exists": true})
	}
	return c.JSON(fiber.Map{"exists": false})
}
