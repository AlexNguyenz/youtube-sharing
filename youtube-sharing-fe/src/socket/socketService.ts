import { io, Socket } from "socket.io-client";

const isDEV = process.env.MODE === "development";
const BASE_URL = isDEV ? process.env.BASE_URL_LOCALHOST : process.env.BASE_URL;

class SocketService {
  private static instance: SocketService;
  private socket: Socket;

  private constructor() {
    this.socket = io(BASE_URL as string, { transports: ["websocket"] });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public getSocket(): Socket {
    return this.socket;
  }
}

export default SocketService;
