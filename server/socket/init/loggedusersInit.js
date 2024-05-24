const CONSTS = require('../constants');
const loggedusersEvent = require('../events/loggedusersEvent');

module.exports = function (io, socket) {
  socket.on(CONSTS.LOGGEDUSERS_CONSTS.C2S_LOGGEDUSERS_DISCONNECT, data => loggedusersEvent.disconnect(io, socket, data));
  socket.on(CONSTS.LOGGEDUSERS_CONSTS.C2S_LOGGEDUSERS_CONNECT, data => loggedusersEvent.authorization(io, socket, data));
  socket.on(CONSTS.LOGGEDUSERS_CONSTS.C2S_LOGGEDUSERS_REGISTER_ACTION, data => loggedusersEvent.registerAction(io, socket, data));
}