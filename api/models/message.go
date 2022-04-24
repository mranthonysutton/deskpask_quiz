package models

import (
	"gorm.io/gorm"
)

type Message struct {
	gorm.Model
	Name           string `json:"name"`
	Message        string `json:"message"`
	Scheduled      int    `json:"scheduled"`
	Date           string `json:"date"`
	Time           string `json:"time"`
	Repeats        int    `json:"repeats"`
	IntervalLength int    `json:"interval_length"`
	IntervalType   string `json:"interval_type"`
}
