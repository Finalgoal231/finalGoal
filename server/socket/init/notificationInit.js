const CONSTS = require('../constants');
const notificationEvent = require('../events/notificationEvents');

module.exports = function (io, socket) {
  socket.on(CONSTS.NOTIFICATION_CONSTS.C2S_NOTIFICATION_CREATE, data => notificationEvent.createNotification(io, socket, data));
  socket.on(CONSTS.NOTIFICATION_CONSTS.C2S_NOTIFICATION_READ, data => notificationEvent.readNotification(io, socket, data));
  socket.on(CONSTS.NOTIFICATION_CONSTS.C2S_NOTIFICATION_READ_BY_OBJID, data => notificationEvent.readNotificationByObjIds(io, socket, data));
}