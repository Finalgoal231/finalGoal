const CONSTS = require('../constants');
const authEvent = require('../events/authorizationEvents');

module.exports = function (io, socket) {
  socket.on(CONSTS.AUTHORIZATION_CONSTS.C2S_AUTH_AUTHORIZATION, data => authEvent.authorization(io, socket, data));
  socket.on(CONSTS.AUTHORIZATION_CONSTS.C2S_AUTH_REGISTERPAGEURL, data => authEvent.registerPageUrl(io, socket, data));
  socket.on('disconnect', data => authEvent.disconnect(io, socket, data));
}