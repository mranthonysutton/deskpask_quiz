package routes

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/go-co-op/gocron"
	"github.com/gorilla/websocket"
	"github.com/mranthonysutton/deskpass_quiz/api/utils"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func WebsocketReader(conn *websocket.Conn) {
	for {
		var jsonMap map[string]MessageSerializer
		dataMessage, p, err := conn.ReadMessage()

		log.Println("MESSAGE RECEIVED", dataMessage)

		if err != nil {
			log.Printf("ERROR: %v", err)
			return
		}

		// Converts the JSON object to a type that golang can reference
		json.Unmarshal([]byte(p), &jsonMap)
		messageMapper := jsonMap["message"]

		if messageMapper.Repeats == 1 {
			repeatableCronJob(messageMapper, conn)
		}

		if messageMapper.Scheduled == 1 {
			scheduleCronJob(messageMapper, conn)
		}

		if err := conn.WriteJSON(jsonMap); err != nil {
			log.Println(err)
			return
		}
	}
}

func WebSocketEndpoint(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err.Error())
	}

	WebsocketReader(ws)
}

func scheduleCronJob(message MessageSerializer, conn *websocket.Conn) {
	s := gocron.NewScheduler(time.UTC)
	s.StartAsync()

	tempTime, err := utils.CreateDateTime(message.Date, message.Time)

	if err != nil {
		log.Println(err.Error())
	}

	// Converts time to 24-hour clock to be read by go-cron
	formattedTime := tempTime.Format("15:04:05")

	s.Every(1).Day().At(formattedTime).Do(func() {
		conn.WriteJSON(message)
	})

}

func repeatableCronJob(message MessageSerializer, conn *websocket.Conn) {
	s := gocron.NewScheduler(time.UTC)
	s.StartAsync()

	switch {
	case message.IntervalType == "SECOND":
		s.Every(message.IntervalLength).Seconds().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "MINUTE":
		s.Every(message.IntervalLength).Minutes().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "HOUR":
		s.Every(message.IntervalLength).Hours().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "DAY":
		s.Every(message.IntervalLength).Days().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "WEEK":
		s.Every(message.IntervalLength).Weeks().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "MONTH":
		s.Every(message.IntervalLength).Months().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "YEAR":
		s.Every(message.IntervalLength * 12).Months().Do(func() {
			conn.WriteJSON(message)
		})
	}
}
