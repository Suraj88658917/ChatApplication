const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Socket.IO Server Running ");
});

const io = new Server(server, {
  cors: { origin: "*" },
});

const users = {};

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // Register user
  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log("Users:", users);
  });

  // Send message
  socket.on("send_message", (data) => {
    const { senderId, receiverId, message } = data;

    console.log(`Message ${senderId} → ${receiverId}: ${message}`);

    const receiverSocket = users[receiverId];

    // send to receiver
    if (receiverSocket) {
      io.to(receiverSocket).emit("receive_message", {
        message,
        senderId,
      });
    }

    // send back to sender (important for UI)
    socket.emit("receive_message", {
      message,
      senderId,
    });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");

    for (let userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
      }
    }
  });
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});