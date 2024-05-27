const socketIo = require('socket.io');

var io;
var nameList = {}

exports.socketServer = (server) => {
  io = socketIo.listen(server)
  io.sockets.on('connection', function (socket) {
    console.log('socket is joined');
    socket.on('id', function (data) {
      nameList[data.userId] = socket
      socket.on('like',function (data) {
        for (const key in nameList) {
          if (key === data.data.author) {
            nameList[key].emit('like', {msg: data.data.msg})
          }
        }
      })
      socket.on('comment', function (data) {
        for (const key in nameList) {
          if (key === data.data.author) {
            nameList[key].emit('comment', {msg: data.data.msg})
          }
        }
      })
    })
    socket.on('disconnect',function () {
      console.log('socket is disconnected');
    })
  })
}