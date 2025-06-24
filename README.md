# Notes:
- TypeScript-based WebSocket server listening on port 5050


### Flow:
User sends message → server receives and logs → calls Gemini → Gemini replies → server sends AI response back to client socket(s). Using async/await  to handle the Gemini API call.


## How to query
1. run `npm install` to grab them packages
2. run `npm start` to start the websockets
3. open postman and create a new websocket request with the following URL: `ws://localhost:5050`
4. give ye old Gemini a little something the chew on:
`
{
  "From": "jeff",
  "Date": "2025-06-23T21:00:00.000Z",
  "Text": "What’s a good budget for my monthly income of $2,000?"
}
`

