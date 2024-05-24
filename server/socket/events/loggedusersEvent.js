const _ = require('lodash');
const CONSTS = require('../constants');
const loggedusersUtils = require('../utils/loggedusersUtils');

exports.authorization = (io, socket, data) => {
  const userId = data.userId;
  const userInfo = _.get( io, `connectedUsers.userlist.${userId}` );
  // console.log('authorization', data, userInfo)
  if ( !userInfo ) {
    socket.emit( CONSTS.LOGGEDUSERS_CONSTS.S2C_LOGGEDUSERS_UNAUTHORIZED, {} );
    return;
  }
  _.set( io, `connectedUsers.sockets.${socket.id}.info.type`, CONSTS.SOCKET_TYPES.LOGGEDUSERS );

  loggedusersUtils.emitLoggeduserInfo( io );
}

exports.disconnect = (io, socket, data) => {
  loggedusersUtils.removeConnected(io, socket);
  loggedusersUtils.emitLoggeduserInfo(io);
}

exports.registerAction = (io, socket, data) => {
  const actionData = {
    ...data,
    action: data.action || '',
    url: data.url || '',
  };
  _.map( actionData, ( item, index ) => {
    _.set( io, `connectedUsers.sockets.${socket.id}.info.${index}`, item || null );
  })
  // const action = data.action || '';
  // const url = data.url || '';
  // _.set( io, `connectedUsers.sockets.${socket.id}.info.action`, action );
  // _.set( io, `connectedUsers.sockets.${socket.id}.info.url`, url );

  loggedusersUtils.registerLog( io, socket, actionData );
  loggedusersUtils.emitLoggeduserInfo( io );
}