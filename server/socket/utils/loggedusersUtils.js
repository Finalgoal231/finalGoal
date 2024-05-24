const rp = require('request-promise');
const _ = require('lodash');
const CONSTS = require('../constants');
const Log = require('../../models/user/systemManagement/LogModel');

const diffLogSaveTime = 5000;

let lastLogSavedInfo = {
  ip: '',
  uid: '',
  url: '',
  action: '',
  time: 0
};

const getLoggedusersInfo = ( io ) => {
  if (!io || !io.connectedUsers || !io.connectedUsers.sockets)
    return null;
  const currentTime = (new Date()).getTime();
  let resultArray = [];
  _.map(io.connectedUsers.sockets, socket => {
    const idleDuration = Math.floor((currentTime - socket.lastConnected) / (60 * 1000)); // 1min
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
    const userId = socket.user || 'unknown';
    // console.log('get logged user info', socket.socket.id, socket.pageUrl)
    resultArray.push({
      userInfo: _.get( io, `connectedUsers.userlist.${userId}.userInfo` ),
      idleMin: idleMin,
      ip: socket.ip,
      pageUrl: socket.pageUrl,
      info: socket.info,
      origin: socket.origin,
    });
  })
  return resultArray;
}

exports.getLoggedUsersId = ( io ) => {
  if (!io || !io.connectedUsers || !io.connectedUsers.userlist)
    return [];
  let resultArray = [];
  _.map( io.connectedUsers.userlist, ( user, index ) => {
    resultArray.push( index );
  });
  return resultArray;
}

exports.emitLoggeduserInfo = ( io ) => {
  const data = getLoggedusersInfo( io );
  _.map( io.connectedUsers.sockets, socket => {
    // const crrSocketType = _.get( socket, 'info.type' ) || '';
		// if ( crrSocketType === CONSTS.SOCKET_TYPES.LOGGEDUSERS && socket.socket && socket.socket.emit ) {
    //   // console.log('emit logged user info. data=', data)
    //   socket.socket.emit( CONSTS.LOGGEDUSERS_CONSTS.S2C_LOGGEDUSERS_USERS, data );
    // }
    if ( socket.socket ) {
      socket.socket.emit( CONSTS.LOGGEDUSERS_CONSTS.S2C_LOGGEDUSERS_USERS, data );
    }
	})
}

exports.removeConnected = (io, socket) => {
  if (!socket.id)
		return;
	// delete io.connectedUsers[socket.id];
	_.set( io, `connectedUsers.sockets.${socket.id}.info`, {} );
}

exports.registerLog = ( io, socket, data ) => {
  const ip = _.get( io, `connectedUsers.sockets.${socket.id}.ip` ) || '';
  const uid = _.get( io, `connectedUsers.sockets.${socket.id}.user` ) || 'unknown';
  const url = data.url || '';
  const action = data.action || '';
  const did = '';

  const crrLogSaveTime = {
    time: new Date(),
    ip,
    uid,
    url,
    action
  };

  if ( lastLogSavedInfo.ip === crrLogSaveTime.ip && 
       lastLogSavedInfo.uid === crrLogSaveTime.uid && 
       lastLogSavedInfo.url === crrLogSaveTime.url && 
       lastLogSavedInfo.action === crrLogSaveTime.action &&
       crrLogSaveTime.time - lastLogSavedInfo.time < diffLogSaveTime
     ) {
    lastLogSavedInfo = crrLogSaveTime;
  } else {
    const log = new Log({ ip, uid, url, action, did });
  
    log.save((err, created) => {
      lastLogSavedInfo = crrLogSaveTime;
    });
  }
}