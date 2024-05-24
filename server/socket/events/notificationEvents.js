const _ = require('lodash');
const mongoose = require('mongoose');
const async = require('async');
const rp = require('request-promise');
const Notification = require('../../models/dashboard/NotificationModel');
const notificationUtils = require('../utils/notificationUtils');
const loggedusersUtils = require('../utils/loggedusersUtils');
const utils = require('../utils');
const config = require('../../_main/socket/config');

exports.createNotification = ( io, socket, data ) => {
  let uids = data.uids || [];
  const pageId = data.pageId;
  const notificationData = {
    type: data.type,
    data: data.data,
    objId: data.objId,
  }
  async.waterfall([
    function (callback) {
      if ( pageId ) {
        const url = `${config.mainApi}/account/user/fetchbypageid?pageId=${pageId}`;
        rp({
          uri: url,
          method: 'GET',
          json: true,
        })
        .then(function(result){
          let uids = [], myUid = utils.getUserIdFromSocket( io, socket ) || '';
          _.map( result.uids, uid => {
            if ( uid !== myUid ) uids.push( uid );
          })
          callback( null, uids )
        })
        .catch(function(err){
        });
        // callback(null, ['6087690338809b17c41a5786'])
      } else {
        callback( null, uids );
      }
    },
    function(uids, callback) {
      let count = 0;
      async.whilst(
        function test() {
          return count < uids.length
        },
        function (aNext) {
          const uid = uids[count];
          const notification = new Notification({
            uid,
            ...notificationData,
          });
          notification.save(() => {
            count++;
            aNext();
          })
        },
        function (err) {
          callback( null, uids )
        }
      );
    },
  ], (err, uids) => {
    if ( err ) {
    } else {
      notificationUtils.broadcastNotifications( io, uids );
    }
  });    
}

exports.readNotification = ( io, socket, data ) => {
  const ids = [];
  _.map( data.ids, id => {
    let objID = mongoose.Types.ObjectId( id );
    if ( String( objID ) === id ) {
      ids.push( id );
    }
  })
  Notification.remove(
    {_id: {$in: ids}},
    (err, doc) => {
      if ( err ) {
        console.log('remove notification err', err);
        return;
      }
      const uid = utils.getUserIdFromSocket( io, socket );
      if ( uid ) {
        notificationUtils.broadcastNotifications( io, [uid] );
      }
    }
  )
}

exports.readNotificationByObjIds = ( io, socket, data ) => {
  let ids = [];
  const uid = data.uid || utils.getUserIdFromSocket( io, socket ) || '';
  if ( !uid ) return;
  _.map( data.ids, id => {
    let objID = mongoose.Types.ObjectId( id );
    if ( String( objID ) === id ) {
      ids.push( id );
    }
  })
  Notification.remove(
    uid === 'all'? {objId: {$in: ids}} : {objId: {$in: ids}, uid: uid},
    (err, doc) => {
      if ( err ) {
        console.log('remove notification by obj err', err);
        return;
      }
      if ( uid ) {
        const uids = uid=== 'all'? loggedusersUtils.getLoggedUsersId( io ) : [uid];
        notificationUtils.broadcastNotifications( io, uids );
      }
    }
  )
}