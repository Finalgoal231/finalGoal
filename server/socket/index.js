const CONSTS = require('./constants');
const chatUtils = require('./utils/chatUtils');
const authUtils = require('./utils/authorizationUtils');
const chatInit = require('./init/chatInit');
const authInit = require('./init/authorizationInit');
const loggedusersInit = require('./init/loggedusersInit');
const notificationInit = require('./init/notificationInit');

exports = module.exports = function (io) {
	// Set socket.io listeners.
	setInterval(() => {
		authUtils.emitUserlistInfos(io);
	}, 60 * 1000); // 1min
	
	io.of(CONSTS.SOCKET).on('connection', (socket) => {
		
		authInit(io, socket);

		
		chatInit(io, socket);

	
		loggedusersInit(io, socket);

		
		notificationInit(io, socket);
	});
};
	