# ⚙️ Go Fiber Backend – Bootstrapping Flow

## 1. Initialize the project

```bash
go mod init github.com/MishraShardendu22/something
```

* Sets up Go module
* Run a `fmt.Println()` after init to confirm setup is clean

---

## 2. Create the main Fiber app

```go
app := fiber.New()
```

---

## 3. Load `.env` (only if not in production)

```go
if os.Getenv("ENVIRONMENT") != "production" {
	if err := godotenv.Load(); err != nil {
		fmt.Println("Error loading .env file")
	}
}
```

---

## 4. Setup CORS middleware

```go
app.Use(cors.New(cors.Config{
	AllowOrigins: os.Getenv("CLIENT_URL"),
	AllowMethods: "GET,POST,PUT,DELETE,OPTIONS",
	AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	AllowCredentials: true,
}))
```

---

## 5. Add test route

```go
app.Get("/test", func(c *fiber.Ctx) error {
	return util.ResponseAPI(c, fiber.StatusOK, "Server is running", nil, "")
})
```

---

## 6. Start the server

```go
port := os.Getenv("PORT")
if port == "" {
	port = "9001"
}
app.Listen(":" + port)
```

---

## 7. To do next

* `ConnectDB()` → place in `util/`
* Define real routes → place in `routes/`
* Wire routes + DB in `main()`


## Extras
* Use air hot reloading 