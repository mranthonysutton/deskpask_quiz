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

// Allows the websocket to continuously read messages from channels
func WebsocketReader(conn *websocket.Conn, messageChannel chan (MessageSerializer)) {
	s := gocron.NewScheduler(time.UTC)
	s.StartAsync()

	go func() {
		receivedMessage := <-messageChannel
		log.Println("MESSAGE RECEIVED FROM CHANNEL", receivedMessage)
		conn.WriteJSON(receivedMessage)
	}()

	// Creates the loop that analyzes and parses the message into a json object that is read by the client
	for {
		var jsonMap map[string]MessageSerializer
		_, p, err := conn.ReadMessage()

		if err != nil {
			log.Printf("ERROR: %v", err)
			return
		}

		// Converts the JSON object to a type that golang can reference
		json.Unmarshal([]byte(p), &jsonMap)
		messageMapper := jsonMap["message"]

		// Determines if the function needs to be setup to continously repeat
		if messageMapper.Repeats == 1 {
			go repeatableCronJob(messageMapper, conn, s, messageChannel)
			return
		}

		// Determines if the message is scheduled for a later time
		if messageMapper.Scheduled == 1 {
			scheduleCronJob(messageMapper, conn, s, messageChannel)
			return
		}

		//TODO: Jobs can be scheduled concurrently, but if a job is scheduled and a new job needs to be ran immediately
		// The immediate job won't run until the scheduled job has been completed
		//TODO: Setup logic when repeats and scheduled both are entered
		// Currently it will schedule the cron job, but will also setup a repeatable instead of wait for the schedule to start the repeatable

		// Sends the converted JSON object to the websocket via channels
		go func() {
			messageChannel <- messageMapper
		}()
	}
}

func WebSocketEndpoint(w http.ResponseWriter, r *http.Request) {
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err.Error())
	}

	messageChannel := make(chan MessageSerializer)

	WebsocketReader(ws, messageChannel)
}

// Schedules the cron job based upon the time and date sent by the client
func scheduleCronJob(message MessageSerializer, conn *websocket.Conn, scheduler *gocron.Scheduler, messageChannel chan (MessageSerializer)) {
	tempTime, err := utils.CreateDateTime(message.Date, message.Time)

	if err != nil {
		log.Println(err.Error())
	}

	// Converts time to 24-hour clock to be read by go-cron
	formattedTime := tempTime.Format("15:04:05")

	// At the scheduled time sends a message to the channel
	scheduler.Every(0).Day().At(formattedTime).Do(func() {
		go func() {
			messageChannel <- message
		}()
	})

}

// Sets up the cron job to repeat every x amount of time based upon the interval selection
func repeatableCronJob(message MessageSerializer, conn *websocket.Conn, scheduler *gocron.Scheduler, messageChannel chan (MessageSerializer)) {

	switch {
	case message.IntervalType == "SECOND":
		scheduler.Every(message.IntervalLength).Seconds().Do(func() {
			go func() {
				log.Printf("Message: %v, send to channel: %v", message, messageChannel)
				messageChannel <- message
			}()
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
		// Scheduler does not allow for x amount of years, by utilizing the month function and adding a year
		// produces the same results
		scheduler.Every(message.IntervalLength * 12).Months().Do(func() {
			conn.WriteJSON(message)
		})
	}
}
