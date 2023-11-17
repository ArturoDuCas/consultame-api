const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const generateToken = (roomCode, userId) => {
  const payload = {
    roomCode,
    userId,
  };

  return jwt.sign(payload, JWT_SECRET, {});
};

const {
  IOS_CONNECTION,
  ROOM_CREATION,
  ROOM_CONNECTION_VERIFICATION,
  ROOM_CONNECTION,
  ROOM_CLOSED,
  MESSAGE_TO_WEB,
  SAVE_MESSAGES_CONFIRMATION,
} = require('./socketEvents');

const activeRooms = new Set();
activeRooms.add('123456');
const socketRoomMap = new Map();

const generateRoomKey = () => {
  return Math.floor(Math.random() * 1000000).toString();
}
const registerSocketHandlers = (io, socket) => {
  socket.on(IOS_CONNECTION, () => {
    console.log(`iOS Client connected: ${socket.id}`);

    const uniqueRoomKey = generateRoomKey();
    socket.join(uniqueRoomKey);
    activeRooms.add(uniqueRoomKey);
    socketRoomMap.set(socket.id, uniqueRoomKey);


    io.to(socket.id).emit(ROOM_CREATION, { roomKey: uniqueRoomKey });
    console.log(`IOS Client ${socket.id} joined room ${uniqueRoomKey}`);
  });

  socket.on(ROOM_CONNECTION_VERIFICATION, (roomCode, callback) => {
    if (activeRooms.has(roomCode)) {
      const token = generateToken(roomCode, socket.id);
      callback({ success: true, message: 'ID de sesión correcto', token });
    } else {
      console.log(`IOS Client ${socket.id} tried to join room ${roomCode} but it doesn't exist`);
      callback({ success: false, message: 'La sala no existe' });
    }
  });

  socket.on(ROOM_CONNECTION, (token, callback) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    if(!decoded) {
      callback({ success: false, message: 'No se pudo conectar al room' });
      console.log(`Web Client ${socket.id} tried to join room ${decoded.roomCode} but the token is invalid`);
      return;
    }

    if(!activeRooms.has(decoded.roomCode)) {
      callback({ success: false, message: 'No se pudo conectar al room' });
      console.log(`Web Client ${socket.id} tried to join room ${decoded.roomCode} but it doesn't exist`);
      return;
    }

    socket.join(decoded.roomCode);
    callback({ success: true, message: 'Conexión al room exitosa' });
    console.log(`Web Client ${socket.id} joined room ${decoded.roomCode}`);
  });

  socket.on(MESSAGE_TO_WEB, (message) => {
    const roomKey = socketRoomMap.get(socket.id);
    if(roomKey) {
      io.to(roomKey).emit(MESSAGE_TO_WEB, message);
      console.log(`IOS Client ${socket.id} sent message to room ${roomKey}`);
    }
  });

  socket.on(SAVE_MESSAGES_CONFIRMATION, (confirmation) => {
    const roomKey = socketRoomMap.get(socket.id);
    console.log({roomKey, confirmation});
  }); 


  socket.on('disconnect', () => {
    const roomKey = socketRoomMap.get(socket.id);
    if(roomKey) {
      io.to(roomKey).emit(ROOM_CLOSED, { message: 'El room se cerró' });
      activeRooms.delete(roomKey);
      socketRoomMap.delete(socket.id);
      console.log(`IOS Client ${socket.id} left room ${roomKey}`);
    }

    console.log(`Disconnected: ${socket.id}`);
  });
};

module.exports = registerSocketHandlers;
