const _ = require('lodash');
const utils = require('./');
const CONSTS = require('../constants');
const notificationUtils = require('../utils/notificationUtils');

exports.registerConnected = (io, socket, userInfo) => {
	if (!io || !socket)
		return;
	if (!io.connectedUsers) {
		io.connectedUsers = {
			sockets: {},
			userlist: {}
		};
	}
	if (!io.userlistInfos) {
		io.userlistInfos = [];
	}

	_.set(io, `connectedUsers.userlist.${userInfo._id}.userInfo`, userInfo);
	_.set(io, `connectedUsers.userlist.${userInfo._id}.sockets.${socket.id}`, true);

	const existSocket = _.get(io, `connectedUsers.sockets.${socket.id}`) || {};
	_.set(io, `connectedUsers.sockets.${socket.id}`, {
		user: userInfo._id,
		socket: socket,
		lastConnected: (new Date()).getTime(),
		idleMin: 0,
		ip: userInfo.ip,
		info: existSocket.info || {},
		pageUrl: existSocket.pageUrl || null,
		origin: existSocket.origin || '',
	});
	notificationUtils.broadcastNotifications(io, [userInfo._id]);
}

exports.removeConnected = (io, socket) => {
	if (!socket.id)
		return;
	const userId = _.get(io, `connectedUsers.sockets.${socket.id}.user`);
	if (io.connectedUsers && io.connectedUsers.sockets) {
		delete io.connectedUsers.sockets[socket.id];
	}
	_.set(io, `connectedUsers.userlist.${userId}.sockets.${socket.id}`, false);
	// remove this user from `userlist` when his all sockets had disconnected
	const sockets = _.get(io, `connectedUsers.userlist.${userId}.sockets`);
	let isSocketOpened = false;
	_.map(sockets, socketStatus => {
		if (socketStatus) isSocketOpened = true;
	});
	if (!isSocketOpened) {
		delete io.connectedUsers.userlist[userId];
	}
}

const getUserlistInfos = (io) => {
	if (!io || !io.connectedUsers || !io.connectedUsers.sockets)
		return null;
	const currentTime = (new Date()).getTime();
	let resultArray = [];
	_.map(io.connectedUsers.sockets, user => {
		const idleDuration = Math.floor((currentTime - user.lastConnected) / (60 * 1000)); // 1min
		let idleMin = 0;
		if (idleDuration >= 30) {
			idleMin = 30;
		} else if (idleDuration >= 15) {
			idleMin = 15;
		} else if (idleDuration >= 10) {
			idleMin = 10;
		} else if (idleDuration >= 5) {
			idleMin = 5;
		} else if (idleDuration >= 1) {
			idleMin = 1;
		}
		resultArray.push({
			userInfo: io.connectedUsers.userlist[user.user],
			ip: user.ip,
			isActive: true,
			idleMin: idleMin
		});
	})
	return resultArray;
}

exports.emitUserlistInfos = (io) => {
	if (!io || !io.connectedUsers)
		return;
	const newUserlistInfos = getUserlistInfos(io);
	if (!newUserlistInfos)
		return;
	if (!utils.compareActivityInfos(io.userlistInfos, newUserlistInfos, 'userInfo._id')) {
		return;
	}
	io.userlistInfos = newUserlistInfos;
	io.of(CONSTS.SOCKET).emit(CONSTS.AUTHORIZATION_CONSTS.S2C_AUTH_USERLISTINFO, {
		users: newUserlistInfos,
	});
}