import WebSocket from "ws";
import { callGemini } from "../gemini";
//import dotenv from "dotenv";
//dotenv.config();

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

  async add(message: Datas, ws: WebSocket) {
    this.Logs.push(message);
    let found: boolean = false;
    for (let ws_ of this.Logins) {
      if (ws_ === ws) {
        found = true;
      } else {
        if (ws_.readyState === WebSocket.OPEN) {
          ws_.send(JSON.stringify(message));
        }
      }
    }
    if (!found) {
      this.Logins.push(ws);
    }

    await this.response();
  }

  async response() {
    const lastMessage = this.Logs[this.Logs.length - 1];
    const prompt = `The user said: "${lastMessage.Text}". Provide a helpful financial insight or response.`;
    
    //Log for prompt being sent to Gemini
    console.log(`Prompt for Gemini: ${prompt}`);
  
    try {
      const aiResponse = await callGemini(prompt);
      
      //Log for Gemini's response
      console.log(`AI Response: ${aiResponse}`);
  
      const responseMessage: Datas = {
        From: "AI",
        Date: new Date().toISOString(),
        Text: aiResponse,
      };
  
      for (let ws_ of this.Logins) {
        if (ws_.readyState === WebSocket.OPEN) {
          ws_.send(JSON.stringify(responseMessage));
        }
      }
      this.Logs.push(responseMessage);
    } catch (error) {
      console.error("Error during Gemini call or response:", error);
    }
  }
}

class Logged {
  Users: { [key: string]: User } = {};

  async add(message: Datas, ws: WebSocket) {
    if (this.Users[message.From] !== undefined) {
      await this.Users[message.From].add(message, ws);
    } else {
      const newUser = new User(message.From, message, ws);
      this.Users[message.From] = newUser;
      await newUser.response();

    }
  }
}

export default Logged;
