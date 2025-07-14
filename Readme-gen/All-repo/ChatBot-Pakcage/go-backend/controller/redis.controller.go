package controller

import (
	"context"

	"github.com/MishraShardendu22/chatbot/util"
	"github.com/gofiber/fiber/v2"
	"github.com/redis/go-redis/v9"
)

var Rdb *redis.Client
var Ctx context.Context

func ClearUserMessages(c *fiber.Ctx) error {
	userID := c.Query("userId")
	if userID == "" {
		return util.ResponseAPI(c, 400, "User ID is required", nil, "Missing userID query parameter")
	}
	key := "chat:" + userID
	err := Rdb.Del(Ctx, key).Err()
	if err != nil {
		return util.ResponseAPI(c, 500, "Failed to clear messages", nil, err.Error())
	}
	return util.ResponseAPI(c, 200, "Messages cleared successfully", nil, "")
}

func GetUserMessages(c *fiber.Ctx) error {
	userID := c.Query("userId")
	messages, err := util.GetAllMessages(userID)

	if err != nil {
		return util.ResponseAPI(c, 500, "Failed to get messages", nil, err.Error())
	}

	return util.ResponseAPI(c, 200, "Messages retrieved successfully", messages, "")
}