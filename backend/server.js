const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

//  ADD THIS ROUTE
app.get("/", (req, res) => {
  res.send("Socket.IO Server Running ");
});

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("send_message", (data) => {
    console.log("Message:", data);
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});