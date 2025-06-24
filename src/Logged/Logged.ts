import WebSocket from "ws";
import { callGemini } from "../gemini";

export interface Datas {
  From: string;
  Date: string;
  Text: string;
}

class User {
  Id: string = "";
  Logs: Datas[] = [];
  Logins: WebSocket[] = [];
  constructor(ID: string, message: Datas, ws: WebSocket) {
    this.Id = ID;
    this.Logins.push(ws);
    this.Logs.push(message);
  }

  add(message: Datas, ws: WebSocket) {
    this.Logs.push(message);
    let found: boolean = false;
    for (let ws_ of this.Logins) {
      if (ws_ === ws) {
        found = true;
      } else {
        if (ws_.readyState === ws_.OPEN) {
          ws_.send(JSON.stringify(message));
        }
      }
    }
    if (!found) {
      this.Logins.push(ws);
    }

    this.response();
  }

  async response() {
    const lastMessage = this.Logs[this.Logs.length - 1];
    const prompt = `The user said: "${lastMessage.Text}". Provide a helpful financial insight or response.`;

    const aiResponse = await callGemini(prompt);
    const responseMessage: Datas = {
      From: "AI",
      Date: new Date().toISOString(),
      Text: aiResponse,
    };

    // Send response to all logged-in sockets for the user
    for (let ws_ of this.Logins) {
      if (ws_.readyState === ws_.OPEN) {
        ws_.send(JSON.stringify(responseMessage));
      }
    }

    // Store the response in logs
    this.Logs.push(responseMessage);
  }
}

class Logged {
  Users: { [key: string]: User } = {};

  add(message: Datas, ws: WebSocket) {
    if (this.Users[message.From] !== undefined) {
      this.Users[message.From].add(message, ws);
    } else {
      this.Users[message.From] = new User(message.From, message, ws);
    }
  }
}

export default Logged;
