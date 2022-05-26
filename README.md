# DeskPass Technical Assessment

## API

The API is coding using golang with fiber, gorm, and gocron to handle scheduling events.

### Running the API

1. `cd api`
2. `go run main.go`

### Data Persistence

I opted to use a sqlite database to store the messages. By using a lightweight database, it does not require a lot of resources to obtain and create new messages. Also, by storing the messages in a database instead of locally would allow the client to be restarted and still be able to retrieve any future scheduled and any previously posted messages.

### Problems Faced

One of the biggest challenges that I faced was implementing the WebSockets to use channels to send the messages instead of relying on the cron job implementation. If I used the cron job implementation, when scheduling a message in the future, it would not allow any additional messages to be run until that job finished. By utilizing channels, I could display a message whenever the channel would receive it, and then just use the cron job to send the message to the channel. However, I am unable to figure out why the messages are not being sent to the channel outside of the immediate function for the WebSocket reader.

## Client

The client was created using react and tailwindcss.

### Running the client

1. `cd client`
2. `npm` or `yarn`
3. `npm start` or `yarn start`

### Client Information

The client consists of two pages, the first page is the home screen that shows all of the scheduled messages. The create page is a form that can be filled out to create a new message.

When a message is received, a banner appears at the top of both pages indicating that a new message has been posted.
