package database

import (
	"log"
	"os"

	"github.com/mranthonysutton/deskpass_quiz/api/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type DbInstance struct {
	Db *gorm.DB
}

var Database DbInstance

func ConnectDatabase() {
	db, err := gorm.Open(sqlite.Open("./database/api.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the database...\n", err.Error())
		os.Exit(2)
	}

	db.Logger = logger.Default.LogMode(logger.Info)
	log.Println("Running migrations...")

	db.AutoMigrate(&models.Message{})

	Database = DbInstance{Db: db}

}
