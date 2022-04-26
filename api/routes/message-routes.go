package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mranthonysutton/deskpass_quiz/api/models"
	"github.com/mranthonysutton/deskpass_quiz/api/utils"
)

func CreateMessage(c *fiber.Ctx) error {
	var message models.Message

	err := c.BodyParser(&message)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	formattedDate, err := utils.CreateDateTime(message.Date, message.Time)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"date_time": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(formattedDate)

}
