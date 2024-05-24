const _ = require('lodash');
const utils = require('./');
const CONSTS = require('../constants');
const lang = require('../../_main/_lang/lang');
const config = require('../../_main/config');

exports.registerConnected = (io, socket, userInfo) => {
	if (!io || !socket)
		return;
	if (!io.connectedUsers) {
		io.connectedUsers = {};
	}
	if (!io.activityInfos) {
		io.activityInfos = [];
	}
}

exports.removeConnected = (io, socket) => {
	if (!socket.id)
		return;
	_.set(io, `connectedUsers.sockets.${socket.id}.info`, {});
}

exports.checkAuthorized = (io, socket) => {
	if (io.connectedUsers && io.connectedUsers.sockets && io.connectedUsers.sockets[socket.id]) {
		io.connectedUsers.sockets[socket.id].lastConnected = (new Date()).getTime();
		return true;
	}
	return false;
}

exports.getUserIdFromSocket = (io, socket) => {
	return _.get(io, `connectedUsers.sockets.${socket.id}.user`) || null;
}

exports.enterRoom = (io, socket, roomId) => {
	_.set(io, `connectedUsers.sockets.${socket.id}.info.roomId`, roomId);
}

exports.leaveRoom = (io, socket) => {
	_.set(io, `connectedUsers.sockets.${socket.id}.info.roomId`, null);
}

exports.getRoomActiveUsers = (io, socket, roomId) => {
	let result = [];
	_.map(io.connectedUsers.sockets, socket => {
		const crrRoomId = _.get(socket, 'info.roomId') || '';
		if (crrRoomId === roomId) {
			result.push(socket.user);
		}
	})
	return result;
}

exports.getRoomUsersFromReceived = (users, creatorId) => {
	let result = [];
	result.push(creatorId);
	_.map(users, uId => {
		if (uId != creatorId) {
			result.push(uId);
		}
	})
	return result;
}

exports.getGroupAddedUsers = (users, newUsers) => {
	let retUsers = [];
	_.map(newUsers, newUserId => {
		if (users.indexOf(newUserId) < 0) {
			retUsers.push(newUserId);
		}
	})
	return retUsers;
}

exports.getGroupRemovedUsers = (users, newUsers) => {
	let retUsers = [];
	_.map(users, userId => {
		if (newUsers.indexOf(userId) < 0) {
			retUsers.push(userId);
		}
	})
	return retUsers;
}

exports.emitWithFilteredByRoom = (io, roomUserIds, key, data) => {
	_.map(io.connectedUsers.sockets, socket => {
		const crrSocketType = _.get(socket, 'info.type') || '';
		if (crrSocketType === CONSTS.SOCKET_TYPES.CHAT) {
			if (roomUserIds.indexOf(socket.user) >= 0 || socket.user == 'admin') {
				socket.socket.emit(key, data);
			}
		}
	})
}