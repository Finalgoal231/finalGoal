const _ = require('lodash');
const async = require('async');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const ChatGroup = require('../../models/user/interchange/chat/ChatGroupModel');
const ChatRoom = require('../../models/user/interchange/chat/ChatRoomModel');
const File = require('../../models/component/FileModel');

const config = require('../../_main/config');
const config_file = require('../../_main/file/config');
const utils = require('../utils');
const chatUtils = require('../utils/chatUtils');
const notificationUtils = require('../utils/notificationUtils');
const CONSTS = require('../constants');

exports.authorization = (io, socket, data) => {
  const userId = data.userId;
  const userInfo = _.get(io, `connectedUsers.userlist.${userId}`);
  if (!userInfo) {
    socket.emit(CONSTS.CHAT_CONSTS.S2C_CHAT_UNAUTHORIZED, {});
    return;
  }

  _.set(io, `connectedUsers.sockets.${socket.id}.info.type`, CONSTS.SOCKET_TYPES.CHAT);
  const isAdmin = userInfo.userID === 'admin';
  if (isAdmin) {
    ChatGroup
      .find({ isArchived: false })
      .exec((err, chatgroups) => {
        if (err || !chatgroups) {
          utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_AUTHORIZATION, 'Group data error', err);
          return;
        }
        ChatRoom
          .find({
            isArchived: false
          }, {
            messages: { $slice: -CONSTS.CHAT_CONSTS.MESSAGE_LOAD_COUNT }
          })
          .exec((err2, chatrooms) => {
            if (err2 || !chatrooms) {
              utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_AUTHORIZATION, 'Room data error', err2);
              return;
            }
            chatUtils.registerConnected(io, socket, userInfo);
            socket.emit(CONSTS.CHAT_CONSTS.S2C_CHAT_AUTHORIZED, {
              groups: chatgroups,
              rooms: chatrooms,
            });
          })
      })
  } else {
    ChatGroup
      .find({ isArchived: false })
      .in('users', [mongoose.Types.ObjectId(userId)])
      .exec((err, chatgroups) => {
        if (err || !chatgroups) {
          utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_AUTHORIZATION, 'Group data error', err);
          return;
        }
        ChatRoom
          .find({
            users: { $elemMatch: { userId: mongoose.Types.ObjectId(userId) } },
            isArchived: false
          }, {
            messages: { $slice: -CONSTS.CHAT_CONSTS.MESSAGE_LOAD_COUNT }
          })
          .exec((err2, chatrooms) => {
            if (err2 || !chatrooms) {
              utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_AUTHORIZATION, 'Room data error', err2);
              return;
            }
            chatUtils.registerConnected(io, socket, userInfo);
            socket.emit(CONSTS.CHAT_CONSTS.S2C_CHAT_AUTHORIZED, {
              groups: chatgroups,
              rooms: chatrooms,
            });
          })
      })
  }
}

exports.disconnect = (io, socket) => {
  // const userId = chatUtils.getUserIdFromSocket(io, socket);
  chatUtils.removeConnected(io, socket);
}

exports.groupArchive = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_GROUP_ARCHIVE, data, ['groupId'], ['id']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const groupId = data.groupId;

  ChatGroup
    .update(
      { _id: mongoose.Types.ObjectId(groupId) },
      { isArchived: true },
      (err, updated) => {
        if (err || !updated) {
          utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_GROUP_ARCHIVE, 'Group update error', err);
          return;
        }
        io.of(CONSTS.SOCKET).emit(CONSTS.CHAT_CONSTS.S2C_CHAT_GROUP_ARCHIVE, {
          sender: userId,
          groupId: groupId,
          isArchived: true
        });
      }
    );
}

exports.groupEdit = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_GROUP_EDIT, data, ['groupId', 'title', 'users'], ['id', 'string', 'array']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const groupId = data.groupId;
  const title = data.title;
  const updatedGroupUsers = chatUtils.getRoomUsersFromReceived(data.users, userId); // add creator if missed

  async.waterfall([
    (callback) => { // ----- Step1. Load group info first -----
      ChatGroup
        .findOne({ _id: mongoose.Types.ObjectId(groupId) }, (err, group) => {
          if (err || !group) {
            callback({ detail: 'step1', err });
          } else {
            callback(null, group);
          }
        })
    },
    (group, callback) => { // ----- Step2. Load public room of that group -----
      ChatRoom
        .findOne({
          group: mongoose.Types.ObjectId(groupId),
          isPublic: true,
        }, (err, publicRoom) => {
          if (err || !publicRoom) {
            callback({ detail: 'step2', err });
          } else {
            callback(null, group, publicRoom._doc ? publicRoom._doc : publicRoom);
          }
        })
    },
    (group, publicRoom, callback) => { // ----- Step3. Prepare updating info -----
      try {
        // calculate newly added, removed users
        const groupUsers = _.map(group.users, user => { return user ? user.toString() : 'unknown' });
        const users_added = chatUtils.getGroupAddedUsers(groupUsers, updatedGroupUsers);
        const users_removed = chatUtils.getGroupRemovedUsers(groupUsers, updatedGroupUsers);

        // console.log('user_added', users_added);
        // console.log('user_removed', users_removed);
        // prepare new messages
        let newMessages = [];
        _.map(users_added, (uid) => {
          newMessages.push({
            _id: new mongoose.Types.ObjectId(),
            msgType: CONSTS.CHAT_CONSTS.CHAT_MESSAGE_TYPE_USER_ADD,
            creatorId: userId,
            content: '',
            contentUserId: uid,
            created: new Date()
          });
        })
        _.map(users_removed, (uid) => {
          newMessages.push({
            _id: new mongoose.Types.ObjectId(),
            msgType: CONSTS.CHAT_CONSTS.CHAT_MESSAGE_TYPE_USER_REMOVED,
            creatorId: userId,
            content: '',
            contentUserId: uid,
            created: new Date()
          });
        })

        // user reading info
        const newMessagesLength = newMessages.length;
        const roomId = publicRoom._id.toString();
        const roomUsers = publicRoom.users;
        const roomMessageLength = publicRoom.messages.length;
        const activeUsers = chatUtils.getRoomActiveUsers(io, socket, roomId);
        const updatedUsers = _.map(updatedGroupUsers, uId => {
          let foundUser = null;
          _.map(roomUsers, roomUser => {
            if (roomUser.userId && uId && roomUser.userId.toString() === uId.toString()) {
              foundUser = roomUser;
            }
          })
          if (foundUser) {// if this user is already in the room
            if (activeUsers.indexOf(foundUser.userId) > -1) {
              return {
                userId: foundUser.userId,
                msgStartIndex: foundUser.msgStartIndex,
                msgLastReadIndex: roomMessageLength + newMessagesLength,
              }
            } else {
              return {
                userId: foundUser.userId,
                msgStartIndex: foundUser.msgStartIndex,
                msgLastReadIndex: foundUser.msgLastReadIndex,
              }
            }
          } else {
            return {
              userId: uId,
              msgStartIndex: roomMessageLength + newMessagesLength,
              msgLastReadIndex: roomMessageLength + newMessagesLength,
            }
          }
        })
        callback(null, publicRoom, roomId, updatedUsers, newMessages, roomMessageLength);
      } catch (err) {
        callback({ detail: 'step3', err });
      }
    },
    (publicRoom, roomId, updatedUsers, newMessages, roomMessageLength, callback) => { // ----- Step4. Update group users first ----
      ChatGroup
        .update(
          { _id: mongoose.Types.ObjectId(groupId) },
          {
            users: updatedGroupUsers,
            title: title,
          },
          (err, updatedGroup) => {
            if (err || !updatedGroup) {
              callback({ detail: 'step4', err });
            } else {
              callback(null, publicRoom, roomId, updatedUsers, newMessages, roomMessageLength);
            }
          }
        );
    },
    (publicRoom, roomId, updatedUsers, newMessages, roomMessageLength, callback) => { // ----- Step5. Update public room -----
      ChatRoom
        .update(
          { _id: mongoose.Types.ObjectId(roomId) },
          {
            $push: { messages: { $each: newMessages } },
            users: updatedUsers,
            messageTotalCount: roomMessageLength + newMessages.length,
          },
          (err, updatedRoom) => {
            if (err || !updatedRoom) {
              callback({ detail: 'step5', err });
            }
            else {
              callback(null, publicRoom, updatedUsers, newMessages, roomMessageLength);
            }
          }
        )
    }
  ], (err, publicRoom, updatedUsers, newMessages, roomMessageLength) => {
    if (err) {
      utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_GROUP_EDIT, err.detail, err.err);
    } else {
      const updatedGroup = {
        _id: groupId,
        users: updatedGroupUsers,
        title: title,
      };
      const updatedPublicRoom = {
        ...publicRoom,
        users: updatedUsers,
        messageTotalCount: roomMessageLength + newMessages.length
      };
      io.of(CONSTS.SOCKET).emit(CONSTS.CHAT_CONSTS.S2C_CHAT_GROUP_EDIT, {
        groupId: groupId,
        userId: userId,
        users: updatedUsers,
        updatedGroup: updatedGroup,
        publicRoom: updatedPublicRoom,
        messages: newMessages,
        sender: userId,
      });
    }
  })
}

exports.groupNew = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_GROUP_NEW, data, ['title', 'users'], ['string', 'array']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const users = chatUtils.getRoomUsersFromReceived(data.users, userId);
  const group = {
    creator: userId,
    title: data.title,
    users: users,
  }

  ChatGroup
    .create(group, (err, createdGroup) => {
      if (err || !createdGroup) {
        utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_GROUP_NEW, 'Group creation error', err);
        return;
      }
      const room = {
        title: 'All members',
        isPublic: true,
        creator: userId,
        group: createdGroup._id,
        users: _.map(users, (uId) => {
          return {
            userId: uId,
            msgStartIndex: 0,
            msgLastReadIndex: 0,
          }
        }),
        messages: [{
          _id: new mongoose.Types.ObjectId(),
          msgType: CONSTS.CHAT_CONSTS.CHAT_MESSAGE_TYPE_NORMAL,
          creatorId: userId,
          content: 'Welcome!!!',
        }],
        messageTotalCount: 1,
      }
      ChatRoom
        .create(room, (err2, createdRoom) => {
          if (err2 || !createdRoom) {
            utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_GROUP_NEW, 'All members creatoin error', err2);
            return;
          }
          io.of(CONSTS.SOCKET).emit(CONSTS.CHAT_CONSTS.S2C_CHAT_GROUP_NEW, {
            newGroup: createdGroup,
            newRoom: createdRoom,
            sender: userId,
          });
        })
    })
}

exports.roomArchive = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_ARCHIVE, data, ['roomId'], ['id']))
    return;

  const roomId = data.roomId;
  const userId = chatUtils.getUserIdFromSocket(io, socket);
  ChatRoom
    .update(
      { _id: mongoose.Types.ObjectId(roomId) },
      { isArchived: true },
      (err, updated) => {
        if (err || !updated) {
          utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_ARCHIVE, 'Room close error', err);
          return;
        }
        io.of(CONSTS.SOCKET).emit(CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_ARCHIVE, {
          sender: userId,
          roomId: roomId,
          isArchived: true
        });
      }
    );
}

exports.roomCreate = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_CREATE, data, ['groupId', 'users'], ['id', 'array']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const groupId = data.groupId;
  const users = chatUtils.getRoomUsersFromReceived(data.users, userId);

  // console.log('room create', data);
  async.waterfall([
    (callback) => { // ----- Step1. load rooms in that group
      ChatRoom
        .find({
          group: mongoose.Types.ObjectId(groupId)
        }, {
          messages: { $slice: 1 }
        })
        .exec((err, rooms) => {
          if (err) {
            callback({ detail: 'step1', err });
          } else {
            callback(null, rooms);
          }
        })
    },
    (rooms, callback) => { // ----- Step2. Check if room should be created or selected
      let matchedRoom = null;
      _.map(rooms, (room) => {
        const roomUsers = room.users;
        if (roomUsers.length === users.length) {
          let found = null;
          _.map(roomUsers, roomUser => {
            if (users.indexOf(roomUser.userId) < 0) {
              found = roomUser;
            }
          })
          // if each users are identical and isArchived false
          if (!found && !room.isArchived) {
            matchedRoom = room;
          }
        }
      })
      if (matchedRoom) { // if that room is already existing
        callback(null, true, matchedRoom);
      } else {
        // create room for that group
        const room = {
          title: 'Individual Room',
          isPublic: false,
          creator: userId,
          group: groupId,
          users: _.map(users, (uId) => {
            return {
              userId: uId,
              msgStartIndex: 0,
              msgLastReadIndex: 0,
            }
          }),
          messages: [{
            _id: new mongoose.Types.ObjectId(),
            msgType: CONSTS.CHAT_CONSTS.CHAT_MESSAGE_TYPE_NORMAL,
            creatorId: userId,
            content: 'Welcome!!!',
          }],
          messageTotalCount: 1,
        }
        ChatRoom
          .create(room, (err2, createdRoom) => {
            if (err2 || !createdRoom) {
              callback({ detail: 'step2', err: err2 });
            } else {
              callback(null, false, createdRoom);
            }
          })
      }
    },
  ], (err, existed, createdRoom) => {
    if (err) {
      utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_CREATE, err.detail, err.err);
    } else {
      chatUtils.emitWithFilteredByRoom(io, users, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_CREATE, {
        sender: userId,
        newRoom: createdRoom,
        groupId: groupId,
        userId: userId,
        existed: existed,
      });
      notificationUtils.broadcastNotifications(io, users);
    }
  })
}

exports.roomEdit = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_EDIT, data, ['groupId', 'users'], ['id', 'array']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const groupId = data.groupId;
  const users = chatUtils.getRoomUsersFromReceived(data.users, userId);

  // console.log('room create', data);
  async.waterfall([
    (callback) => { // ----- Step1. load rooms in that group
      ChatRoom
        .find({
          group: mongoose.Types.ObjectId(groupId)
        }, {
          messages: { $slice: 1 }
        })
        .exec((err, rooms) => {
          if (err) {
            callback({ detail: 'step1', err });
          } else {
            callback(null, rooms);
          }
        })
    },
    (rooms, callback) => { // ----- Step2. Check if room should be created or selected
      let matchedRoom = null;
      _.map(rooms, (room) => {
        const roomUsers = room.users;
        if (roomUsers.length === users.length) {
          let found = null;
          _.map(roomUsers, roomUser => {
            if (users.indexOf(roomUser.userId) < 0) {
              found = roomUser;
            }
          })
          // if each users are identical
          if (!found) {
            matchedRoom = room;
          }
        }
      })
      if (matchedRoom) { // if that room is already existing
        callback(null, true, matchedRoom);
      } else {
        // create room for that group
        const room = {
          title: 'Individual Room',
          isPublic: false,
          creator: userId,
          group: groupId,
          users: _.map(users, (uId) => {
            return {
              userId: uId,
              msgStartIndex: 0,
              msgLastReadIndex: 0,
            }
          }),
          messages: [{
            _id: new mongoose.Types.ObjectId(),
            msgType: CONSTS.CHAT_CONSTS.CHAT_MESSAGE_TYPE_NORMAL,
            creatorId: userId,
            content: 'Welcome!!!',
          }],
          messageTotalCount: 1,
        }
        ChatRoom
          .create(room, (err2, createdRoom) => {
            if (err2 || !createdRoom) {
              callback({ detail: 'step2', err: err2 });
            } else {
              callback(null, false, createdRoom);
            }
          })
      }
    },
  ], (err, existed, createdRoom) => {
    if (err) {
      utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_CREATE, err.detail, err.err);
    } else {
      chatUtils.emitWithFilteredByRoom(io, users, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_CREATE, {
        sender: userId,
        newRoom: createdRoom,
        groupId: groupId,
        userId: userId,
        existed: existed,
      });
      notificationUtils.broadcastNotifications(io, users);
    }
  })
}

exports.roomEnter = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_USER_ENTER, data, ['roomId'], ['id']))
    return;

  const roomId = data.roomId;
  const userId = chatUtils.getUserIdFromSocket(io, socket);

  ChatRoom
    .find({
      _id: mongoose.Types.ObjectId(roomId),
    }, {
      messages: { $slice: 1 }
    })
    .exec((err, rooms) => {
      if (err || !rooms || rooms.length === 0) {
        utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_USER_ENTER, 'Room find error', err);
        return;
      }
      const selectedRoom = rooms[0]._doc || rooms[0];
      const msgTotalLength = selectedRoom.messageTotalCount;
      let updatedUsers = [];
      _.map(selectedRoom.users, roomUser => {
        if (roomUser.userId && roomUser.userId.toString() === userId) {
          updatedUsers.push({
            _id: roomUser._id,
            userId: roomUser.userId,
            msgStartIndex: roomUser.msgStartIndex,
            msgLastReadIndex: msgTotalLength
          });
        } else {
          updatedUsers.push({
            _id: roomUser._id,
            userId: roomUser.userId,
            msgStartIndex: roomUser.msgStartIndex,
            msgLastReadIndex: roomUser.msgLastReadIndex,
          });
        }
      })

      ChatRoom
        .update(
          { _id: mongoose.Types.ObjectId(roomId) },
          {
            users: updatedUsers,
          },
          { new: false },
          (err2, result) => {
            if (err2 || !result) {
              utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_USER_ENTER, 'Room update error', err2);
              return;
            }
            chatUtils.enterRoom(io, socket, roomId);
            socket.emit(CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_USER_ENTER, {
              sender: userId,
              userId,
              roomId,
              updatedRoom: {
                ...selectedRoom,
                users: updatedUsers,
              },
            });

            const uid = utils.getUserIdFromSocket(io, socket);
            if (uid) {
              notificationUtils.broadcastNotifications(io, [uid]);
            }
          }
        )
    })
}

exports.roomLeave = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  chatUtils.leaveRoom(io, socket);
  io.of(CONSTS.SOCKET).emit(CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_USER_LEAVE, {
    userId: userId,
  })
}

exports.roomLoadMoreMessages = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_LOAD_MOREMESSAGES, data, ['roomId', 'loadedCount'], ['id', 'number']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const roomId = data.roomId;
  const loadedCount = data.loadedCount;
  const isAdmin = userId === 'admin';

  const sliceLength = loadedCount + CONSTS.CHAT_CONSTS.MESSAGE_LOAD_COUNT;

  ChatRoom
    .find({
      _id: mongoose.Types.ObjectId(roomId),
    }, {
      messages: { $slice: -sliceLength }
    })
    .exec((err, rooms) => {
      if (err || !rooms || rooms.length === 0) {
        utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_USER_ENTER, 'Room find error', err);
        return;
      }
      const selectedRoom = rooms[0]._doc || rooms[0];
      const foundUser = _.filter(selectedRoom.users, roomUser => roomUser.userId === userId)
      if ((!foundUser || foundUser.length === 0) && !isAdmin) {
        utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_LOAD_MOREMESSAGES, 'user find failed', null);
        return;
      }

      const messages = selectedRoom.messages;
      const msgLength = selectedRoom.messageTotalCount;
      const userInfo = foundUser[0];
      const tmpStartPos = msgLength - loadedCount - CONSTS.CHAT_CONSTS.MESSAGE_LOAD_COUNT;
      const startPos = tmpStartPos < userInfo.msgStartIndex ? userInfo.msgStartIndex : tmpStartPos;
      const endPos = msgLength - loadedCount;
      const offset = msgLength - messages.length;

      // console.log('msg', msgLength, startPos, endPos);
      if (startPos < endPos) {
        const loadedMsgs = messages.slice(startPos - offset, endPos - offset);
        socket.emit(CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_LOAD_MOREMESSAGES, {
          sender: userId,
          roomId: roomId,
          updatedRoom: selectedRoom,
          messages: loadedMsgs,
        });
      } else {
        socket.emit(CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_LOAD_MOREMESSAGES, {
          sender: userId,
          roomId: roomId,
          updatedRoom: selectedRoom,
          messages: [],
        });
      }
    })
}

exports.roomMessageDelete = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_DELETE, data, ['roomId', 'messageId', 'userIds'], ['id', 'id', 'array']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const roomId = data.roomId;
  const msgId = data.messageId;
  const userIds = data.userIds;

  // add new message and update userInfo
  ChatRoom
    .findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(roomId), 'messages._id': msgId },
      {
        $set: {
          'messages.$.msgType': CONSTS.CHAT_CONSTS.CHAT_MESSAGE_TYPE_DELETED,
        }
      },
      { new: false },
      (err, room) => {
        if (err || !room) {
          utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_DELETE, 'Room update error', err);
          return;
        }
        chatUtils.emitWithFilteredByRoom(io, userIds, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_MESSAGE_DELETE, {
          sender: userId,
          userId: userId,
          roomId: roomId,
          msgId: msgId,
        });
      }
    )
}

exports.roomMessageEdit = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_EDIT, data, ['roomId', 'messageId', 'userIds', 'content'], ['id', 'id', 'array', 'string']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const roomId = data.roomId;
  const msgId = data.messageId;
  const content = data.content;
  const userIds = data.userIds;

  // add new message and update userInfo
  ChatRoom
    .findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(roomId), 'messages._id': msgId },
      {
        $set: {
          'messages.$.msgType': CONSTS.CHAT_CONSTS.CHAT_MESSAGE_TYPE_EDITED,
          'messages.$.content': content,
        }
      },
      { new: false },
      (err, room) => {
        if (err || !room) {
          utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_EDIT, 'Room update error', err);
          return;
        }
        chatUtils.emitWithFilteredByRoom(io, userIds, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_MESSAGE_EDIT, {
          sender: userId,
          userId: userId,
          roomId: roomId,
          msgId: msgId,
          content: content,
        });
      }
    )
}

const getFileSizeString = (filesize) => {
  if (!filesize) {
    return '0MB';
  }
  const kb = (filesize / 1000);
  const mb = (filesize / 1000000);
  if (mb >= 1) {
    return mb.toFixed(1) + 'MB';
  } else {
    return kb.toFixed(1) + 'KB';
  }
}

exports.roomMessageFiles = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_FILES, data, ['roomId', 'files'], ['id', 'array']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const roomId = data.roomId;
  const files = data.files;

  const newMessages = _.map(files, file => {
    const fSize = getFileSizeString(file.filesize);
    return {
      _id: new mongoose.Types.ObjectId(),
      msgType: CONSTS.CHAT_CONSTS.CHAT_MESSAGE_TYPE_FILE,
      creatorId: userId,
      content: `${file.name} (File size: ${fSize})`,
      file: {
        id: file._id,
        name: file.name,
        mime: file.mime,
        md5: file.md5,
        filesize: file.filesize,
      },
    }
  });

  ChatRoom
    .find({
      _id: mongoose.Types.ObjectId(roomId)
    }, {
      messages: { $slice: 1 }
    })
    .exec((err, rooms) => {
      if (err || !rooms || rooms.length === 0) {
        utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_FILES, 'Room find error', err);
        return;
      }
      const room = rooms[0]._doc || rooms[0];

      // user reading info
      const newTotalCount = room.messageTotalCount + files.length;
      const activeUsers = chatUtils.getRoomActiveUsers(io, socket, roomId);
      const updatedUsers = _.map(room.users, (roomUser) => {
        if (activeUsers.indexOf(roomUser.userId) > -1) {
          return {
            userId: roomUser.userId,
            msgStartIndex: roomUser.msgStartIndex,
            msgLastReadIndex: newTotalCount,
          }
        } else {
          return {
            userId: roomUser.userId,
            msgStartIndex: roomUser.msgStartIndex,
            msgLastReadIndex: roomUser.msgLastReadIndex,
          }
        }
      })
      // add new messages and update userInfo
      ChatRoom
        .update(
          { _id: mongoose.Types.ObjectId(roomId) },
          {
            $push: { messages: { $each: newMessages } },
            users: updatedUsers,
            messageTotalCount: newTotalCount
          },
          (err2, updated) => {
            if (err2 || !updated) {
              utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_FILES, 'Room update error', err2);
              return;
            }
            const userIds = _.map(room.users, user => user.userId);
            const updatedRoom = {
              ...room,
              users: updatedUsers,
              messageTotalCount: newTotalCount,
            }
            chatUtils.emitWithFilteredByRoom(io, userIds, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_MESSAGE_FILES, {
              sender: userId,
              roomId: roomId,
              userId: userId,
              messages: newMessages,
              updatedRoom: updatedRoom,
            });
            notificationUtils.broadcastNotifications(io, userIds);
          }
        )
    })
}

exports.roomMessageNew = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_NEW, data, ['roomId', 'content', 'msgType'], ['id', 'string', 'string']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const roomId = data.roomId;
  const content = data.content;
  const msgType = data.msgType;
  const file = data.file;
  const newMessage = {
    _id: new mongoose.Types.ObjectId(),
    msgType: msgType,
    creatorId: userId,
    content: content,
    file: file,
    created: new Date()
  }

  ChatRoom
    .find({
      _id: mongoose.Types.ObjectId(roomId)
    }, {
      messages: { $slice: 1 }
    })
    .exec((err, rooms) => {
      if (err || !rooms || rooms.length === 0) {
        utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_NEW, 'Room find error', err);
        return;
      }
      const room = rooms[0]._doc || rooms[0];

      // user reading info
      const newTotalCount = room.messageTotalCount + 1;
      const activeUsers = chatUtils.getRoomActiveUsers(io, socket, roomId);
      const updatedUsers = _.map(room.users, (roomUser) => {
        if (activeUsers.indexOf(roomUser.userId.toString()) > -1) {
          return {
            userId: roomUser.userId,
            msgStartIndex: roomUser.msgStartIndex,
            msgLastReadIndex: newTotalCount,
          }
        } else {
          return {
            userId: roomUser.userId,
            msgStartIndex: roomUser.msgStartIndex,
            msgLastReadIndex: roomUser.msgLastReadIndex,
          }
        }
      })

      // add new message and update userInfo
      ChatRoom
        .update(
          { _id: mongoose.Types.ObjectId(roomId) },
          {
            $push: { messages: newMessage },
            users: updatedUsers,
            messageTotalCount: newTotalCount
          },
          (err2, updated) => {
            if (err2 || !updated) {
              utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_NEW, 'Room update error', err2);
              return;
            }
            const userIds = _.map(room.users, user => user.userId);
            const updatedRoom = {
              ...room,
              users: updatedUsers,
              messageTotalCount: newTotalCount,
            }
            chatUtils.emitWithFilteredByRoom(io, userIds, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_MESSAGE_NEW, {
              sender: userId,
              roomId: roomId,
              userId: userId,
              messages: [newMessage],
              updatedRoom: updatedRoom,
            });
            notificationUtils.broadcastNotifications(io, userIds);
          }
        )
    })
}

exports.roomMessageRecommend = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;
  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_RECOMMEND, data, ['roomId', 'messageId', 'userIds', 'emoIndex'], ['id', 'id', 'array', 'string']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const roomId = data.roomId;
  const msgId = data.messageId;
  const emoIndex = data.emoIndex;
  const userIds = data.userIds;

  const newRecommend = {
    userId: userId,
    emoIndex: emoIndex,
  };

  // add new message and update userInfo
  ChatRoom
    .findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(roomId), 'messages._id': msgId },
      {
        $push: { 'messages.$.recommend': newRecommend },
      },
      { new: false },
      (err, room) => {
        if (err || !room) {
          utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_RECOMMEND, 'Room update error', err);
          return;
        }
        chatUtils.emitWithFilteredByRoom(io, userIds, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_MESSAGE_RECOMMEND, {
          sender: userId,
          userId: userId,
          roomId: roomId,
          msgId: msgId,
          recommend: newRecommend,
        });
      }
    )
}

exports.roomMessageFileDownload = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;
  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_FILE_DOWNLOAD, data, ['roomId', 'messageId', 'userIds'], ['id', 'id', 'array']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const roomId = data.roomId;
  const msgId = data.messageId;
  const userIds = data.userIds;
  const newDownloaded = {
    userId: userId,
    createdAt: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
  };

  // // add new message and update userInfo
  ChatRoom
    .findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(roomId), 'messages._id': msgId },
      {
        $push: { 'messages.$.file.downloaded': newDownloaded },
      },
      { new: false },
      (err, room) => {
        if (err || !room) {
          utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_RECOMMEND, 'Room update error', err);
          return;
        }
        chatUtils.emitWithFilteredByRoom(io, userIds, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_MESSAGE_FILE_DOWNLOAD, {
          sender: userId,
          userId: userId,
          roomId: roomId,
          msgId: msgId,
          downloaded: newDownloaded,
        });
      }
    )
}

exports.roomMessageRecord = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  if (!utils.validate(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_RECORD, data, ['roomId'], ['id']))
    return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const roomId = data.roomId;
  const blob = data.blob;
  const timeLength = data.time || 0;
  const fileSize = blob.length;
  const fileName = moment(new Date()).format('YYYYMMDDHHmmss') + '.mp3';

  async.waterfall([
    function (acallback) {
      // register to file db
      const mFile = new File({
        name: fileName,
        mime: 'audio/mpeg',
        filesize: fileSize,
      });
      mFile.save((err1, created) => {
        if (err1) {
          acallback(err1);
        } else {
          acallback(null, created);
        }
      })
    },
    function (createdFile, acallback) {
      let folderPath = path.join(config_file.upload, config_file.upload_attachment);
      // save file 
      fs.writeFile(folderPath + "/" + createdFile._id, blob, "binary", function (err, result) {
        if (err) {
          acallback(err);
        } else {
          const newMessage = {
            _id: new mongoose.Types.ObjectId(),
            msgType: CONSTS.CHAT_CONSTS.CHAT_MESSAGE_TYPE_RECORD,
            creatorId: userId,
            content: `${createdFile.name} (Time: ${timeLength} seconds)`,
            file: {
              id: createdFile._id,
              name: createdFile.name,
              mime: createdFile.mime,
              md5: createdFile.md5,
              filesize: createdFile.filesize,
            },
          };
          acallback(null, newMessage);
        }
      });
    },
    function (newMessage, acallback) {
      ChatRoom
        .find({
          _id: mongoose.Types.ObjectId(roomId)
        }, {
          messages: { $slice: 1 }
        })
        .exec((err, rooms) => {
          if (err || !rooms || rooms.length === 0) {
            utils.sendError(socket, CONSTS.CHAT_CONSTS.C2S_CHAT_ROOM_MESSAGE_FILES, 'Room find error', err);
            acallback(err);
            return;
          }
          const room = rooms[0]._doc || rooms[0];

          // user reading info
          const newTotalCount = room.messageTotalCount + 1;
          const activeUsers = chatUtils.getRoomActiveUsers(io, socket, roomId);
          const updatedUsers = _.map(room.users, (roomUser) => {
            if (activeUsers.indexOf(roomUser.userId) > -1) {
              return {
                userId: roomUser.userId,
                msgStartIndex: roomUser.msgStartIndex,
                msgLastReadIndex: newTotalCount,
              }
            } else {
              return {
                userId: roomUser.userId,
                msgStartIndex: roomUser.msgStartIndex,
                msgLastReadIndex: roomUser.msgLastReadIndex,
              }
            }
          })
          // add new messages and update userInfo
          ChatRoom
            .update(
              { _id: mongoose.Types.ObjectId(roomId) },
              {
                $push: { messages: newMessage },
                users: updatedUsers,
                messageTotalCount: newTotalCount
              },
              (err2, updated) => {
                if (err2 || !updated) {
                  utils.sendError(socket, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_MESSAGE_RECORD, 'Room update error', err2);
                  acallback(err2);
                  return;
                }
                const userIds = _.map(room.users, user => user.userId);
                const updatedRoom = {
                  ...room,
                  users: updatedUsers,
                  messageTotalCount: newTotalCount,
                }
                chatUtils.emitWithFilteredByRoom(io, userIds, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_MESSAGE_RECORD, {
                  sender: userId,
                  roomId: roomId,
                  userId: userId,
                  messages: [newMessage],
                  updatedRoom: updatedRoom,
                });
                notificationUtils.broadcastNotifications(io, userIds);
                acallback(null);
              }
            )
        })
    }
  ], function (err, result) {
    if (err) {
      console.log('async error', err);
      return;
    }
  })
}

exports.roomUserStopTyping = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const roomId = data.roomId;

  const userIds = chatUtils.getRoomActiveUsers(io, socket, roomId);

  chatUtils.emitWithFilteredByRoom(io, userIds, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_USER_STOPTYPING, {
    roomId: roomId,
    userId: userId,
  });
}

exports.roomUserTyping = (io, socket, data) => {
  if (!chatUtils.checkAuthorized(io, socket)) return;

  const userId = chatUtils.getUserIdFromSocket(io, socket);
  const roomId = data.roomId;

  if (!roomId)
    return;

  const userIds = chatUtils.getRoomActiveUsers(io, socket, roomId);

  chatUtils.emitWithFilteredByRoom(io, userIds, CONSTS.CHAT_CONSTS.S2C_CHAT_ROOM_USER_TYPING, {
    roomId: roomId,
    userId: userId,
  });
}