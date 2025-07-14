# ⚙️ Redis Setup with Go (Using Upstash) – Environment, Init, Usage

---

## 📁 `.env` File

```env
UPSTASH_PASSWORD="AXFFAAIjcDEyMmYsdfsd5ZjMzNGIxZjE0ODc4YjMxZjQzZjE4ZTFjYzg0ZnAxMA"
REDIS_URL="curious-hedgehog-28247.upstash.io:6379"
````

---

## 🛠️ Redis Initialization in Go

```go
package util

import (
	"context"
	"crypto/tls"
	"fmt"
	"os"

	"github.com/redis/go-redis/v9"
)

var Ctx = context.Background()

var Rdb = redis.NewClient(&redis.Options{
	Addr:      os.Getenv("REDIS_URL"),
	Password:  os.Getenv("UPSTASH_PASSWORD"),
	DB:        0,
	TLSConfig: &tls.Config{},
})
```

---

## 🔍 Check Redis Connection

```go
pong, err := Rdb.Ping(Ctx).Result()
if err != nil {
	fmt.Println("Redis connection failed:", err)
} else {
	fmt.Println("Redis connected:", pong)
}
```

---

## 🌐 Share Redis Client and Context

```go
util.Rdb = Rdb
util.Ctx = Ctx

controller.Rdb = Rdb
controller.Ctx = Ctx
```

---

## 🧰 Example Redis Utility Functions

```go
// Store a message in a list
func StoreMessageRedis(userID string, message string) error {
	key := "chat:" + userID
	return Rdb.RPush(Ctx, key, message).Err()
}

// Get all messages for a user
func GetAllMessages(userID string) ([]string, error) {
	key := "chat:" + userID
	return Rdb.LRange(Ctx, key, 0, -1).Result()
}

// Delete all messages
func ClearMessages(userID string) error {
	key := "chat:" + userID
	return Rdb.Del(Ctx, key).Err()
}
```

---

## ✅ Notes

* Requires: `github.com/redis/go-redis/v9`
* TLS is required for Upstash.
* Use `.env` loader (`godotenv`, or manual `os.Getenv`).
* Always use shared `Ctx` and `Rdb` instances.

---
