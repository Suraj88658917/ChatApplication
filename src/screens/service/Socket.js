import io from "socket.io-client";

const SOCKET_URL = "http://10.5.50.39:8000"; 

class WsService {
  initializeSocket = () => {
    this.socket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    this.socket.on("connect", () => {
      console.log("Connected:", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log("Disconnected");
    });
  };

  emit(event, data) {
    this.socket.emit(event, data);
  }

  on(event, cb) {
    this.socket.on(event, cb);
  }

  removeListener(event) {
    this.socket.off(event);
  }
}

export default new WsService();