package utils

import (
	"errors"
	"time"
)

func CreateDateTime(inputDate string, inputTime string) (time.Time, error) {
	rawDateTime := inputDate + " " + inputTime

	combinedDateTime, err := time.Parse("2006-01-02 15:04", rawDateTime)
	if err != nil {
		return time.Now(), errors.New("Unable to convert time")
	}

	combinedDateTime = combinedDateTime.Add(time.Hour * 7)

	return combinedDateTime, nil

}
