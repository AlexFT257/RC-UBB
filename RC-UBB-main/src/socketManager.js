import { io } from 'socket.io-client';

export const socket = io('http://localhost:3001', { transports: ['websocket'] });

export let socketID = '';
socket.on('connection', () => {
    socketID = socket.id
    console.log('Connected to server');
})

