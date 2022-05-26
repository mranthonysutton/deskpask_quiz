package main

import (
	"log"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/mranthonysutton/deskpass_quiz/api/database"
	"github.com/mranthonysutton/deskpass_quiz/api/routes"
)

// Quick route that verifies that the API is running
func welcome(c *fiber.Ctx) error {
	message := &fiber.Map{"api": "Is up and running..."}
	return c.Status(fiber.StatusOK).JSON(message)
}

// Generates all the routes and their endpoints
func generateRoutes(app *fiber.App) {
	app.Get("/api", welcome)

	// Message
	app.Get("/api/v1/message", routes.GetAllMessages)
	app.Post("/api/v1/message", routes.CreateMessage)
}

// Creates the websocket and its endpoint
func generateWebSocket() {
	http.HandleFunc("/ws", routes.WebSocketEndpoint)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func main() {
	database.ConnectDatabase()

	app := fiber.New()
	app.Use(cors.New())
	generateRoutes(app)
	go generateWebSocket()

	log.Fatal(app.Listen(":4000"))
}
