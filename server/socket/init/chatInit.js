const CONSTS = require('../constants');
const chatEvents = require('../events/chatEvents');

module.exports = function (io, socket) {
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_DISCONNECT, data => chatEvents.disconnect(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_AUTHORIZATION, data => chatEvents.authorization(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_GROUP_NEW, data => chatEvents.groupNew(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_GROUP_EDIT, data => chatEvents.groupEdit(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_GROUP_ARCHIVE, data => chatEvents.groupArchive(io, socket, data));

  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_USER_ENTER, data => chatEvents.roomEnter(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_USER_LEAVE, data => chatEvents.roomLeave(io, socket, data));

  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_NEW, data => chatEvents.roomMessageNew(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_FILES, data => chatEvents.roomMessageFiles(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_EDIT, data => chatEvents.roomMessageEdit(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_DELETE, data => chatEvents.roomMessageDelete(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_RECOMMEND, data => chatEvents.roomMessageRecommend(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_RECORD, data => chatEvents.roomMessageRecord(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_FILE_DOWNLOAD, data => chatEvents.roomMessageFileDownload(io, socket, data));

  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_USER_TYPING, data => chatEvents.roomUserTyping(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_USER_STOPTYPING, data => chatEvents.roomUserStopTyping(io, socket, data));
  
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_CREATE, data => chatEvents.roomCreate(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_EDIT, data => chatEvents.roomEdit(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_ARCHIVE, data => chatEvents.roomArchive(io, socket, data));
  socket.on(CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_LOAD_MOREMESSAGES, data => chatEvents.roomLoadMoreMessages(io, socket, data));
}