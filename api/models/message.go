package models

import (
	"time"

	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	Name           string    `json:"name"`
	Message        string    `json:"message"`
	Scheduled      bool      `json:"scheduled"`
	ScheduledDate  time.Time `json:"date"`
	Repeats        bool      `json:"repeats"`
	IntervalLength int       `json:"interval_length"`
	IntervalType   string    `json:"interval_type"`
}
