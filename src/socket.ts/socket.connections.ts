import { io, Socket } from "socket.io-client";
import { IFirebaseUser } from "../Models";
import { tankSteeringInterface } from "../Models";

const mode: string = "dev";

const url = mode === "prod" ? "https://rawbotz.com" : "https://robotanium-admin-app-x22js.ondigitalocean.app";
const socketUrl = mode === "prod" ? "https://rawbotz.com" : "https://rawbotz.com";

export class Ws {
  socket: Socket;
  constructor(token: string) {
    this.socket = io("");

    this.socket.on("user_list", (userArrays: any) => {
      console.log(userArrays);
    });

    this.socket.on("messages_list", (messages: any) => {
      console.log(messages);
    });
  }

  connect = (token: string): void => {
    console.log('should connect now', "htt")
    this.socket = io(socketUrl);
  };

  connectToBot = (token:string, botId: string) => {
    this.socket.emit('connect_to_bot', {token, botId} )
  }

  registerUer = (user: IFirebaseUser) => {
    this.socket.on("connect", () => {
      console.log("socket connected");
    });

    const userInfo: any = {
      Action: "adduser",
      Username: user.displayName,
      UserId: user.uid,
      email: user.email,
      socketId: this.socket.id,
    };

    this.socket.emit("registeruser", userInfo);
  };

  sendChatMessage = (userName: string, message: string) => {
    this.socket.emit("add_chat_message", {
      userName,
      message,
    });
  };

  sendControls = (controls: tankSteeringInterface, token: string, botId: string) => {
    if(!this.socket.connect ) {
      this.connect('sd');
    }
    console.log("should send");
    console.log(this.socket.connected);
    this.socket.emit("send_bot_message", { controls: { ...controls }, token, botId });
  };
}

export const socketConnection = new Ws("");
