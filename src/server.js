var io = require('socket.io')(8432)
var _ = require('lodash')

var connected_users = []

var log_int = 5,
    log_num = 1

function addUserToConnectedList( user ) {

  connected_users.push(user)
  connected_users = _.uniqBy(connected_users, JSON.stringify)

  log_num++

  if(log_num == log_int) {
    console.log('Connected users: ' + connected_users.username)
    log_num = 1
  }

}

io.sockets.on('connection', function( sock ) {

  sock.on('user connect', function( data ){
    addUserToConnectedList(data)
    console.log(data.username + ' (' + data.uuid + ') connected')
    io.sockets.emit('user connect', data)
  })

  sock.on('user namechange', function( data ){
    console.log(data.old + " changed their name to " + data.new)

    io.sockets.emit('user namechange', {
      old: data.old,
      new: data.new
    })

  })

  sock.on('message', function( data ){
    console.log(data)
    io.sockets.emit('message', data)
  })

  sock.on('keepalive', function( data ) {
    addUserToConnectedList(data)
  })

  sock.on('user cleanup', function(){
    connected_users = []
    io.sockets.emit('knock')
  })

  sock.on('request connected users', function(){

    var result = []

    connected_users.forEach(function(index, value){

      // strip users with null names. nobody likes them.
      if( index['username'] !== undefined ) {
        result.push(index['username'])
      }

    })

    sock.emit('connected users', result)
  })

  sock.on('disconnect', function( data ){
    console.log("User disconnected.")
    io.sockets.emit('user disconnect')
  })

})
