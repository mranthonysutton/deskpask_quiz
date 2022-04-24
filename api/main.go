package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/mranthonysutton/deskpass_quiz/api/database"
)

func welcome(c *fiber.Ctx) error {
	message := &fiber.Map{"api": "Is up and running..."}
	return c.Status(fiber.StatusOK).JSON(message)
}

func generateRoutes(app *fiber.App) {
	app.Get("/api", welcome)
}

func main() {
	database.ConnectDatabase()

	app := fiber.New()
	generateRoutes(app)

	log.Fatal(app.Listen(":4000"))
}
