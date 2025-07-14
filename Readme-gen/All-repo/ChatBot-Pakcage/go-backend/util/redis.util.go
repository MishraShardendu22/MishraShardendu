package util

import (
	"context"
	"time"

	"github.com/redis/go-redis/v9"
)

var Rdb *redis.Client
var Ctx context.Context

func StoreMessageRedis(userID string, message string) error {
	key := "chat:" + userID
	err := Rdb.RPush(Ctx, key, message).Err()
	if err != nil {
		return err
	}
	return Rdb.Expire(Ctx, key, 30*time.Minute).Err()
}

func GetAllMessages(userID string) ([]string, error) {
	key := "chat:" + userID
	return Rdb.LRange(Ctx, key, 0, -1).Result()
}