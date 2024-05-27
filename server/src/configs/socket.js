const io = require("socket.io");
const User = require("../models/userModel");
// const { setSocketMsg } = require("../../../client/src/redux/articleSlice");

let userarr = [];

exports.initialize = (server) => {
  const sio = io.listen(server);
  console.log("socket server is running");
  sio.on("connection", function (socket) {
    socket.emit("connection-success", "successfully connected to socket server");
    socket.on("createArticle", function (msg) {
      socket.emit("createArticle-resend", msg);
    });
    socket.on("signin", function (username, msg) {
      socket.username = username;
      userarr.push(socket);
      socket.to(username).emit("signin-resend", msg);
    });
  });
};
