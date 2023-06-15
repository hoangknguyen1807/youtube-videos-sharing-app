import socketIOClient from 'socket.io-client';

const socketUrl = process.env.REACT_APP_SOCKET_SERVER_URL;

const socket = socketIOClient(socketUrl as string, {
    transports: ['websocket'],
    rejectUnauthorized: false
});

export default socket;
