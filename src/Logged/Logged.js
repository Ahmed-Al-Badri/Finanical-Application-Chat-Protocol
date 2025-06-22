"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Logged {
    constructor() {
        this.Users = {};
    }
    add(message, ws) {
        if (this.Users[message.From] != undefined) {
        }
    }
}
class User {
    constructor(ID, message, ws) {
        this.Id = "";
        this.Logs = [];
        this.Logins = [];
        this.Id = ID;
        this.Logins.push(ws);
        this.Logs.push(message);
    }
    add(message, ws) {
        this.Logs.push(message);
        let found = false;
        for (let ws_ of this.Logins) {
            if (ws_ == ws) {
                found = true;
            }
            else {
                ws_.send(JSON.stringify(message));
            }
        }
        if (found) {
            this.Logins.push(ws);
        }
        this.response();
    }
    response() {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("This is where the AI is being used, ideally it uses the last logs to respond to")
            //loop though the sockets to send;
        });
    }
}
