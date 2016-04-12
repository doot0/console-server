var io = require('socket.io')(8432)

io.on('connection', function( sock ) {

  sock.on('user connect', function( data ){
    console.log('user ' + data.uuid + ' connected')
  })

  sock.on('message', function( data ){
    var body = data.body
    console.log(body)
    io.emit('message', body)
  })

  sock.on('disconnect', function( data ){
    console.log("Unknown user disconnected.");
  })

})
