package routes

import (
	"github.com/MishraShardendu/portfolio-backend/internal/controllers"
	"github.com/MishraShardendu/portfolio-backend/internal/middleware"
	"github.com/gofiber/fiber/v2"
)

func Register(app *fiber.App) {
	app.Get("/healthz", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})
	app.Post("/api/auth/register", controllers.Register)
	app.Post("/api/auth/login", controllers.Login)
	app.Get("/api/auth/me", middleware.JWTProtected(), controllers.Me)
	app.Get("/api/projects/featured", controllers.GetFeaturedProjects)
	app.Get("/api/projects", controllers.GetAllProjects)
	app.Post("/api/projects", middleware.JWTProtected(), controllers.CreateProject)
	app.Put("/api/projects/:id", middleware.JWTProtected(), controllers.UpdateProject)
	app.Delete("/api/projects/:id", middleware.JWTProtected(), controllers.DeleteProject)
	app.Get("/api/experience", controllers.GetExperience)
	app.Post("/api/experience", middleware.JWTProtected(), controllers.CreateExperience)
	app.Put("/api/experience/:id", middleware.JWTProtected(), controllers.UpdateExperience)
	app.Delete("/api/experience/:id", middleware.JWTProtected(), controllers.DeleteExperience)
	app.Get("/api/techstack", controllers.GetTechStack)
	app.Post("/api/techstack", middleware.JWTProtected(), controllers.CreateTechStack)
	app.Put("/api/techstack/:id", middleware.JWTProtected(), controllers.UpdateTechStack)
	app.Delete("/api/techstack/:id", middleware.JWTProtected(), controllers.DeleteTechStack)
	app.Get("/api/blogs", controllers.GetBlogs)
	app.Get("/api/blogs/:id", controllers.GetBlogByID)
	app.Post("/api/blogs", middleware.JWTProtected(), controllers.CreateBlog)
	app.Put("/api/blogs/:id/publish", middleware.JWTProtected(), controllers.PublishBlog)
	app.Delete("/api/blogs/:id", middleware.JWTProtected(), controllers.DeleteBlog)
	app.Get("/api/oss", controllers.GetOSS)
	app.Post("/api/oss", middleware.JWTProtected(), controllers.CreateOSS)
	app.Put("/api/oss/:id", middleware.JWTProtected(), controllers.UpdateOSS)
	app.Delete("/api/oss/:id", middleware.JWTProtected(), controllers.DeleteOSS)
	app.Get("/api/achievements", controllers.GetAchievements)
	app.Post("/api/achievements", middleware.JWTProtected(), controllers.CreateAchievement)
	app.Put("/api/achievements/:id", middleware.JWTProtected(), controllers.UpdateAchievement)
	app.Delete("/api/achievements/:id", middleware.JWTProtected(), controllers.DeleteAchievement)
	app.Post("/api/contact", controllers.Contact)
	app.Get("/api/cloudinary/signature", middleware.JWTProtected(), controllers.CloudinarySignature)
	app.Post("/api/auth/logout", controllers.Logout)
	app.Get("/api/auth/admin-exists", controllers.AdminExists)
	// Add more route registrations here
}
