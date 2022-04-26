package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/mranthonysutton/deskpass_quiz/api/database"
	"github.com/mranthonysutton/deskpass_quiz/api/models"
	"github.com/mranthonysutton/deskpass_quiz/api/utils"
)

type MessageSerializer struct {
	ID             uint   `json:"id" gorm:"primaryKey"`
	Name           string `json:"name"`
	Message        string `json:"message"`
	Scheduled      int    `json:"scheduled"`
	Date           string `json:"date"`
	Time           string `json:"time"`
	Repeats        int    `json:"repeats"`
	IntervalLength int    `json:"interval_length"`
	IntervalType   string `json:"interval_type"`
}

func ParseMessageFromClient(messageModel MessageSerializer) models.Message {
	var isScheduled bool
	var doesRepeat bool
	formattedDate, _ := utils.CreateDateTime(messageModel.Date, messageModel.Time)

	if messageModel.Repeats == 1 {
		doesRepeat = true
	}

	if messageModel.Scheduled == 1 {
		isScheduled = true
	}

	return models.Message{Name: messageModel.Name, Message: messageModel.Message, Scheduled: isScheduled, ScheduledDate: formattedDate, Repeats: doesRepeat, IntervalLength: messageModel.IntervalLength, IntervalType: messageModel.IntervalType}
}

func GetAllMessages(c *fiber.Ctx) error {
	messages := []models.Message{}
	database.Database.Db.Find(&messages)

	if len(messages) == 0 {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "No messages have been created"})
	}

	return c.Status(fiber.StatusOK).JSON(messages)
}

func CreateMessage(c *fiber.Ctx) error {
	var messageBody MessageSerializer

	if err := c.BodyParser(&messageBody); err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(err.Error())
	}

	formattedMessage := ParseMessageFromClient(messageBody)

	// TODO: Save the message to the database
	database.Database.Db.Create(&formattedMessage)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"message": "Has been successfully posted", "data": formattedMessage})

}
