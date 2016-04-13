var io = require('socket.io')(8432)

io.on('connection', function( sock ) {

  sock.on('user connect', function( data ){
    console.log(data.username + ', ' + data.uuid + ' connected')
    io.emit('user connect', data);
  })

  sock.on('user namechange', function( data ){
    console.log(data.old + " changed their name to " + data.new)

    io.emit('user namechange', {
      old: data.old,
      new: data.new
    })

  })

  sock.on('message', function( data ){
    console.log(data)
    io.emit('message', data)
  })

  sock.on('disconnect', function( data ){
    console.log("Unknown user disconnected.");
  })

})
