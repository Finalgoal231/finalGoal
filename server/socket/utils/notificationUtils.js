const _ = require("lodash");
const async = require("async");
const CONSTS = require("../constants");
const Notification = require("../../models/dashboard/NotificationModel");
const ChatGroup = require("../../models/user/interchange/chat/ChatGroupModel");
const ChatRoom = require("../../models/user/interchange/chat/ChatRoomModel");

exports.getUnreadsMessages = (uids, callbackFunc) => {
  // get count of unreaded real-time chatting dialogues 
  async.waterfall(
    [
      function (callback) {
        ChatGroup.find({ isArchived: false }).exec((err, chatGroups) => {
          if (err) {
            callback(err);
            return;
          }
          callback(null, chatGroups);
        });
      },
      function (chatGroups, callback) {
        ChatRoom.find({ isArchived: false }, { messages: { $slice: 1 } }).exec(
          (err, chatRooms) => {
            if (err) {
              callback(err);
              return;
            }
            callback(null, chatGroups, chatRooms);
          }
        );
      },
    ],
    (err, chatGroups, chatRooms) => {
      const users = {}
      const existingGroups = {}
      if (!err) {
        _.map(uids, uid => {
          users[uid] = []
        })
        _.map(chatGroups, group => {
          existingGroups[group._id] = group
        })
        const groupedRooms = _.groupBy(chatRooms, 'group')
        _.map(groupedRooms, (rooms, groupID) => {
          const group = existingGroups[groupID]
          if (group == undefined) return
          _.map(rooms, room => {
            const messageTotalCount = room.messageTotalCount
            _.map(room.users, user => {
              if (users[user.userId] == undefined)
                return
              const roomUnreads = messageTotalCount - user.msgLastReadIndex
              if (roomUnreads > 0) {
                users[user.userId].push({
                  type: "NOTIFICATION_CHAT",
                  url: `/interchange/chatting?roomId=${room._id}`,
                  title: "New Message...",
                  content: `There is ${roomUnreads} unread messages in ${room.title} room of ${group.title} group`,
                  count: roomUnreads
                })
              }
            })
          })
        })
      }
      callbackFunc(users);
    }
  );
};

exports.broadcastNotifications = (io, uids) => {
  const getUnreadsMessages = this.getUnreadsMessages;
  async.waterfall(
    [
      function (callback) {
        Notification.find({ uid: { $in: uids } }).exec((err, docs) => {
          if (err) {
            callback(err);
            return;
          }
          callback(null, docs);
        });
      },
      function (notifications, callback) {
        getUnreadsMessages(uids, (chatNotifications) => {
          callback(null, notifications, chatNotifications);
        });
      },
    ],
    (err, notifications, chatNotifications) => {
      if (err) {
        console.log("broadcast notifications err", err);
        return;
      }
      const groupedNotifications = _.groupBy(notifications, "uid") || {};
      _.map(uids, (uid) => {
        const userInfo = _.get(io, `connectedUsers.userlist.${uid}`) || {};
        if (!userInfo.userInfo) {
          // don't emit info they are not connected.
          return;
        }

        // calc normal notifications
        let normalNotifications = groupedNotifications[uid] || [];

        // emit total notifications (including chats)
        const sockets = userInfo.sockets;
        _.map(sockets, (socketStatus, socketId) => {
          if (socketStatus) {
            const socket = _.get(
              io,
              `connectedUsers.sockets.${socketId}.socket`
            );
            if (socket) {
              socket.emit(
                CONSTS.NOTIFICATION_CONSTS.S2C_NOTIFICATION_BROADCAST,
                normalNotifications.concat(chatNotifications[uid] || [])
              );
            }
          }
        });
      });
    }
  );
};
