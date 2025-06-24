# Notes:
- TypeScript-based WebSocket server listening on port 5050


### Current Flow:
User sends message → server receives and logs → calls Gemini → Gemini replies → server sends AI response back to client socket(s). Using async/await to handle the Gemini API call.


## How to get her up and running 
1. run `npm install` to grab them packages
   1. might need to `npm install axios` if you see package related error when running `npm start` I doesn't make sense b/c it is in the package.json.... but whatever
2. run `npm start` to start the websockets
3. open postman and create a new websocket request with the following URL: `ws://localhost:5050` and hit connect 
4. give ye old Gemini a little something the chew on in the message and hit send 
`
{
  "From": "jeff",
  "Date": "2025-06-23T21:00:00.000Z",
  "Text": "What’s a good budget for my monthly income of $2,000?"
}
`
5. I added console logs so you will be able to see who sent the message (From), the message itself as well as the reponse from Gemini

[]