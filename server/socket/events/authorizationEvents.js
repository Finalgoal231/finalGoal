const jwt = require('jsonwebtoken');
const _ = require('lodash');

const utils = require('../utils');
const authUtils = require('../utils/authorizationUtils');
const chatUtils = require('../utils/chatUtils');
const loggedusersUtils = require('../utils/loggedusersUtils');
const CONSTS = require('../constants');
const config = require('../../_main/config');

exports.authorization = (io, socket, data) => {
	const token = utils.parseToken(data.token);
	if ( !token ) {
		socket.disconnect(CONSTS.AUTHORIZATION_CONSTS.S2C_AUTH_UNAUTHORIZED);
		return;
	}
	jwt.verify(token, config.secret, null, (err, decoded) => {
		if (err) {
			socket.disconnect(CONSTS.AUTHORIZATION_CONSTS.S2C_AUTH_UNAUTHORIZED);
			return;
		}
		socket.emit(CONSTS.AUTHORIZATION_CONSTS.S2C_AUTH_AUTHORIZED);
		decoded._id = decoded.id
		authUtils.registerConnected(io, socket, decoded);
		authUtils.emitUserlistInfos(io);
		loggedusersUtils.emitLoggeduserInfo(io);
	})
}

exports.registerPageUrl = (io, socket, data) => {
	if ( io.connectedUsers && io.connectedUsers.sockets && io.connectedUsers.sockets[socket.id] ) {
		// console.log('here', data, 'socketId=', socket.id)
		const origin = ( ( _.get( socket, 'handshake.headers.origin' ) || '' ).split( ':' ) || [] )[0];
		io.connectedUsers.sockets[socket.id].lastConnected = ( new Date() ).getTime();
		io.connectedUsers.sockets[socket.id].pageUrl = data.pageUrl;
		io.connectedUsers.sockets[socket.id].origin = origin || '';
		loggedusersUtils.registerLog( io, socket, {url: data.pageUrl} );
		loggedusersUtils.emitLoggeduserInfo( io );
		// console.log(io.connectedUsers.sockets)
	}
}

exports.disconnect = (io, socket) => {
	// const userId = chatUtils.getUserIdFromSocket(io, socket);
	authUtils.removeConnected(io, socket);
	authUtils.emitUserlistInfos(io);
	loggedusersUtils.emitLoggeduserInfo(io);
}