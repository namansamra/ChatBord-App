const express = require("express");
const app = express();
const socket = require("socket.io");
const http = require("http");
const router = require("./router");
const cors = require("cors");


const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./users");

const PORT = process.env.PORT || 4000;

const server = http.createServer(app); //server for backend
const io = socket(server); //instance of socket server

app.use(router);
app.use(cors());

io.on("connection", (socket) => {
  //when we are expecting something on backend we use socket.on and we are sending something at frontend we do socket.emit()  GENERALLY
  socket.on("join", ({ name, room }, callback) => {
    const { err, user } = addUser({ id: socket.id, name, room });
    if (err) {
      return callback(err);
    }

    socket.emit("message", {
      user: "admin",
      text: `${user.name} you are welcomed to the ${user.room} room!!`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the room.`,
    });

    socket.join(user.room); //to add user in the room

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  socket.on("user-send-message", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} left the room.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});
server.listen(PORT, () => {
  console.log("connected to port");
});
