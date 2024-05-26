const io = require("socket.io");
const User = require("../models/userModel")

const usrarr =[];

exports.initialize = server => {
  const sio = io.listen(server);
  console.log("socket server is running");
  sio.on("connection", function(socket) {
    socket.emit("connection-success", "successfully connected to socket server");
    // socket.off("login");
    socket.on("login", function(userid){
          console.log("username is", userid);
    });
    socket.on("createArticle", function(msg) {
      socket.emit("createArticle-resend", msg);
    })
  });
}