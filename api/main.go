package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/mranthonysutton/deskpass_quiz/api/database"
	"github.com/mranthonysutton/deskpass_quiz/api/routes"
)

func welcome(c *fiber.Ctx) error {
	message := &fiber.Map{"api": "Is up and running..."}
	return c.Status(fiber.StatusOK).JSON(message)
}

func generateRoutes(app *fiber.App) {
	app.Get("/api", welcome)

	// Message
	app.Get("/api/v1/message", routes.GetAllMessages)
	app.Post("/api/v1/message", routes.CreateMessage)
}

func main() {
	database.ConnectDatabase()

	app := fiber.New()
	generateRoutes(app)

	log.Fatal(app.Listen(":4000"))
}
