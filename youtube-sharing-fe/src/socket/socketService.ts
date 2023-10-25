import { io, Socket } from "socket.io-client";

const isDEV = import.meta.env.DEV;
const BASE_URL = isDEV
  ? import.meta.env.VITE_BASE_URL_LOCALHOST
  : import.meta.env.VITE_BASE_URL;

class SocketService {
  private static instance: SocketService;
  private socket: Socket;

  private constructor() {
    this.socket = io(BASE_URL, { transports: ["websocket"] });
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
