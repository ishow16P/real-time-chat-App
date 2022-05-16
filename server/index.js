const express = require("express");
const cors = require("cors");
require("./models");
const app = express();
const socket = require("socket.io");

app.use(cors());
app.use(express.json());

app.use(require("./routes"));

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`server running port ${PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
