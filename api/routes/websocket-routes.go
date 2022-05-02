package routes

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin:     func(r *http.Request) bool { return true },
}

func WebsocketReader(conn *websocket.Conn) {
	for {
		var jsonMap map[string]interface{}
		_, p, err := conn.ReadMessage()

		if err != nil {
			log.Println("FAILING HERE", err)
			return
		}

		json.Unmarshal([]byte(p), &jsonMap)
		fmt.Println(jsonMap)

		if err := conn.WriteJSON(jsonMap); err != nil {
			log.Println(err)
			return
		}
	}
}
func WebSocketEndpoint(w http.ResponseWriter, r *http.Request) {
	log.Println("WEBSOCKET")
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err.Error())
	}

	log.Println("Client succesfully connected...")
	WebsocketReader(ws)
}
