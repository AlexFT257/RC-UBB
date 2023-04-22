const http = require('http')
const express = require('express')
const cors = require('cors')

// Create the Express app and the HTTP server
const app = express()
const server = http.createServer(app)

// Serve static files from the public directory
app.use(express.static('public'))
app.use(cors())

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST']
  }
})

let ids = [{userID : -1, socketIds : [-1]}]


io.on('connection', function (socket) {

  socket.on('user info', (data) => {
    
    console.log('A user connected')
    console.log('New connection from', socket.handshake.address)
    let idx = -1;
    

    //io.to(socket.id).emit('new user', data.content) EMITITR USUARIOS CONECTADOS PREVIAMENTE IDs

    if ((idx = ids.findIndex(x => x.userID === data.content.id)) === -1) {
      ids.push({userID : data.content.id, socketIds : [socket.id]})
      io.emit('new user', data.content)
    }else if (ids[idx].socketIds.findIndex(x => x === socket.id) === -1){
      ids[idx].socketIds.push(socket.id);
    }  
    /* ids.forEach((id)=>{
      id.socketIds.forEach((sockID)=>{
        let msg = {userID : data.content, content : "Hola soy nuevo", toUser : id.userID}
        io.to(sockID).emit('chat message', msg);
        msg = {userID : id.userID, content : "Hola soy nuevo", toUser : data.content} //TAMAL
        io.to(socket.id).emit('chat message', msg); 
        
      })
    }) */
    
    console.log('Received message from client:', data, socket.id, ids);
  });

  // Add a listener for incoming chat messages
  socket.on('chat message', function (msg, callback) {
    let idx = -1;
    callback("sended");

    console.log("emittin to ", msg.userID, msg.toUser)
    if((idx = ids.findIndex((x)=> x.userID === msg.toUser)) > -1){ 
      ids[idx].socketIds.forEach((val)=>{
        io.to(val).emit('chat message', msg, (response) => {
          callback(response);
        });
      })
    }

    /* //let reverseMsg = { userID :  } //TAMAL
    if((idx = ids.findIndex((x)=> x.userID === msg.userID)) > -1){ 
      
      ids[idx].socketIds.forEach((val)=>{
        io.to(val).emit('chat message', msg);
      })
    } */

  })

  // Add a listener for disconnection events
  socket.on('disconnect', function () {
    console.log('A user disconnected')
    let idx = -1;
    let sockeIdx = -1;
    if( (idx = ids.findIndex((x)=> (sockeIdx = x.socketIds.findIndex((y) => y === socket.id)) > -1)) > -1){
      ids[idx].socketIds.splice(sockeIdx, 1)
    }
  })
})

// Start the server listening on port 3001
server.listen(3001, function () {
  console.log('Server listening on port 3001')
})
