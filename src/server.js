var io = require('socket.io')(8432)

io.sockets.on('connection', function( sock ) {

  sock.on('user connect', function( data ){
    console.log(data.username + ', ' + data.uuid + ' connected')
    io.sockets.emit('user connect', data);
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

  sock.on('disconnect', function( data ){
    console.log("User disconnected.");
  })

})
