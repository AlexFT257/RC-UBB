const http = require('http')
const express = require('express')
const cors = require('cors')

// Create the Express app and the HTTP server
const app = express()
const socketServer = http.createServer(app)

// Serve static files from the public directory
app.use(express.static('public'))
app.use(cors())

const io = require('socket.io')(socketServer, {
    cors: {
        origin: 'http://localhost:3001',
        methods: ['GET', 'POST']
    }
})

let connectedUsers = [{ userID: -1, socketIds: [-1] }]

io.on('connection', function (socket) {
    socket.on('connected user', data => {
        if (!data.friends) {
            return;
        }
        console.log('A user connected from', socket.handshake.address)
        let idx = -1

        if ((idx = connectedUsers.findIndex(x => x.userID === data.id)) === -1) {
            connectedUsers.push({ userID: data.id, socketIds: [socket.id] })

            data.friends.forEach(friend => {
                console.log('emittin to ', friend.id)

                if ((idx = connectedUsers.findIndex(x => x.userID === friend.id)) > -1) {
                    connectedUsers[idx].socketIds.forEach(val => {
                        io.to(val).emit('connected friend', msg, response => { callback(response) })
                    })
                }
            })

        } else if (connectedUsers[idx].socketIds.findIndex(x => x === socket.id) === -1) {
            connectedUsers[idx].socketIds.push(socket.id)
        }
    })

    // Add a listener for incoming chat messages
    socket.on('chat message', async function (data, callback) {
        let idx = -1;
        const reciveds = [];
        const openeds = [];

        for (const userID of data.toUsers) {
            console.log('emitting to', userID);

            if ((idx = connectedUsers.findIndex(x => x.userID === userID)) > -1) {
                const connectedUser = connectedUsers[idx];
                const promises = [];
                let recived = false, opened = false;

                for (const socketId of connectedUser.socketIds) {

                    promises.push(new Promise((resolve, reject) => {
                        const timeout = setTimeout(() => {
                            reject(new Error('Timeout: No response received'));
                        }, 10000); // Timeout after 10 seconds

                        io.to(socketId).emit('chat message', data.content, response => {
                            clearTimeout(timeout);
                            if(!recived){
                                reciveds.push(userID);
                            } 

                            if(!opened && response.open){
                                openeds.push(userID)
                            }

                            resolve();
                        });
                    }));
                }

                try {
                    await Promise.all(promises);
                } catch (error) {
                    console.log(error.message);
                    // Handle the timeout or failure here
                }
            }
        }

        callback({reciveds, openeds});
    });

    // Add a listener for disconnection events
    socket.on('disconnect', function () {
        let idx = -1
        let sockeIdx = -1
        if ((idx = connectedUsers.findIndex(x => (sockeIdx = x.socketIds.findIndex(y => y === socket.id)) > -1)) > -1) {
            connectedUsers[idx].socketIds.splice(sockeIdx, 1)
        }
        console.log('A user disconnected', connectedUsers)
    })
})

// Start the server listening on port 3001
socketServer.listen(3001, function () {
    console.log('Server listening on port 3001')
})
