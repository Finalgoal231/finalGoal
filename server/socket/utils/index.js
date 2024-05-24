const _ = require('lodash');
const lang = require('../../_main/_lang/lang');
const CONSTS = require('../constants');

exports.getUserIdFromSocket = ( io, socket ) => {
  return _.get( io, `connectedUsers.sockets.${socket.id}.user` ) || '';
}

exports.compareActivityInfos = (src1, src2, orderKey) => {
	if (!src1 || !src2) {
		return true;
	}
	if (src1.length != src2.length)
		return true;
	const ordered1 = orderKey? _.orderBy(src1, user=>_.get( user, orderKey ), 'asc') : src1;
	const ordered2 = orderKey? _.orderBy(src2, user=>_.get( user, orderKey ), 'asc') : src2;
	const str1 = JSON.stringify(ordered1);
	const str2 = JSON.stringify(ordered2);
	// console.log('compare', str1, '----', str2);
	if (str1 != str2)
		return true;
	return false;
}

exports.parseToken = (token) => {
	var re = /(\S+)\s+(\S+)/;
	if (typeof token !== 'string') {
		return null;
	}
	var matches = token.match(re);
	return matches && matches[2];
}

exports.sendError = (socket, type, detail, err) => {
	if (socket) {
		console.log('send error', type, detail, err);
		socket.emit(CONSTS.CHAT_CONSTS.S2C_CHAT_ERROR, {
			type,
			detail,
			err
		});
	}
}
 
exports.validate = (socket, eventType, data, fields, types) => {
  let errorMsg = [];
  let check = false;
  for(let i=0; i< fields.length; i++){
    const value = data[fields[i]];
    const type = types[i];
    if( (typeof (value) === 'undefined') || (value === null) ) {
      errorMsg.push(fields[i] + ' : ' + lang('require_param')); check = true;
    } else {
      switch(type){
        case 'id':
          if( !value.match(/^[0-9a-fA-F]{24}$/)) {
            errorMsg.push(fields[i] + ' : ' + lang('invalid_id')); check = true;
          }          
          break;
        case 'string': 
          if (!value || value.trim().length == 0) {
            errorMsg.push(fields[i] + ' : ' + lang('require_string')); check = true;
          }
          break;
        case 'number': 
          if (typeof(value) !== 'number') {
            errorMsg.push(fields[i] + ' : ' + lang('invalid_number')); check = true;
          }
          break;
        case 'boolean':
          if (typeof(value) !== 'boolean') {
            errorMsg.push(fields[i] + ' : ' + lang('invalid_boolean')); check = true;
          }
          break;
        case 'date': 
          if (value.trim().length != 10 || value.trim().split('-').length != 3) {
            errorMsg.push(fields[i] + ' : ' + lang('invalid_date')); check = true;
          }
          break;
        case 'array': 
          if ( typeof(value) === 'object' && value.length == 0) {
            errorMsg.push(fields[i] + ' : ' + lang('require_array')); check = true;
          }
          break;
        default: break;
      }
    }    
  }
	if(check) { // if error exists
		this.sendError(socket, eventType, 'Parameter error', errorMsg);
		return false;
  } else {
    return true;
  }
}