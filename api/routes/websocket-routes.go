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
	s := gocron.NewScheduler(time.UTC)
	s.StartAsync()

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
			repeatableCronJob(messageMapper, conn, s)
		}

		if messageMapper.Scheduled == 1 {
			scheduleCronJob(messageMapper, conn, s)
		}

		//TODO: Jobs can be scheduled concurrently, but if a job is scheduled and a new job needs to be ran immediately
		// The immediate job won't run until the scheduled job has been completed
		//TODO: Setup logic when repeats and scheduled both are entered
		// Currently it will schedule the cron job, but will also setup a repeatable instead of wait for the schedule to start the repeatable

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

func scheduleCronJob(message MessageSerializer, conn *websocket.Conn, scheduler *gocron.Scheduler) {
	tempTime, err := utils.CreateDateTime(message.Date, message.Time)

	if err != nil {
		log.Println(err.Error())
	}

	time.Sleep(time.Until(tempTime))

	// Converts time to 24-hour clock to be read by go-cron
	formattedTime := tempTime.Format("15:04:05")

	scheduler.Every(0).Day().At(formattedTime).Do(func() {
		conn.WriteJSON(message)
	})

}

func repeatableCronJob(message MessageSerializer, conn *websocket.Conn, scheduler *gocron.Scheduler) {
	switch {
	case message.IntervalType == "SECOND":
		scheduler.Every(message.IntervalLength).Seconds().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "MINUTE":
		scheduler.Every(message.IntervalLength).Minutes().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "HOUR":
		scheduler.Every(message.IntervalLength).Hours().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "DAY":
		scheduler.Every(message.IntervalLength).Days().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "WEEK":
		scheduler.Every(message.IntervalLength).Weeks().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "MONTH":
		scheduler.Every(message.IntervalLength).Months().Do(func() {
			conn.WriteJSON(message)
		})
	case message.IntervalType == "YEAR":
		scheduler.Every(message.IntervalLength * 12).Months().Do(func() {
			conn.WriteJSON(message)
		})
	}
}
