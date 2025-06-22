import WebSocket from "ws";

class Logged {
  Users: { [key: string]: User } = {};
  constructor() {}

  add(message: Datas, ws: WebSocket) {
    if (this.Users[message.From] != undefined) {
      this.Users[message.From].add(message, ws);
    } else {
      this.Users[message.From] = new User(message.From, message, ws);
    }
  }
}

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
      if (ws_ == ws) {
        found = true;
      } else {
        if (ws_.OPEN) {
          ws_.send(JSON.stringify(message));
        }
      }
    }
    if (found) {
      this.Logins.push(ws);
    }

    this.response();
  }

  async response() {
    //console.log("This is where the AI is being used, ideally it uses the last logs to respond to")
    //loop though the sockets to send;
  }
}

export default Logged;
