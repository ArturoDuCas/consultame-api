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
  SAVE_MESSAGES_CONFIRMATION,
  SEND_COMPLETE_MESSAGE,
  SEND_MESSAGE_BEING_WRITTEN,
  REQUEST_CONSULTATION_DATA,
  SEND_CONSULTATION_DATA,
  UPDATE_MESSAGE,

} = require('./socketEvents');

const activeRooms = new Set();
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

  socket.on(SEND_CONSULTATION_DATA, (data) => {
    const { consultationID } = data;
    const roomKey = socketRoomMap.get(socket.id);

    if(roomKey) {
      io.to(roomKey).emit(SEND_CONSULTATION_DATA, consultationID);
      console.log(`IOS Client ${socket.id} sent consultation data to room ${roomKey}`);
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
    io.to(decoded.roomCode).emit(REQUEST_CONSULTATION_DATA);
    callback({ success: true, message: 'Conexión al room exitosa' });
    console.log(`Web Client ${socket.id} joined room ${decoded.roomCode}`);
  });

  socket.on(SAVE_MESSAGES_CONFIRMATION, (data) => {
    const { roomKey, confirmation } = data;
    console.log({roomKey, confirmation});

    io.to(roomKey).emit(SAVE_MESSAGES_CONFIRMATION, confirmation);
  });


  socket.on(UPDATE_MESSAGE, (data) => {
    const { token, message, id } = data;
    const decoded = jwt.verify(token, JWT_SECRET);
    if(!decoded) {
      console.log(`Web Client ${socket.id} tried to update message ${id} but the token is invalid`);
      return;
    }

    const roomKey = decoded.roomCode;
    if(roomKey) {
      io.to(roomKey).emit(UPDATE_MESSAGE, { message, id });
      console.log(`Web Client ${socket.id} updated message ${id} in room ${roomKey}`);
    }
  });


  socket.on(SEND_MESSAGE_BEING_WRITTEN, (message) => {
    const roomKey = socketRoomMap.get(socket.id);
    if(roomKey) {
      io.to(roomKey).emit(SEND_MESSAGE_BEING_WRITTEN, message);
      console.log(`IOS Client ${socket.id} sent message being written to room ${roomKey}`);
    }
  });

  socket.on(SEND_COMPLETE_MESSAGE, (message) => {
    const roomKey = socketRoomMap.get(socket.id);
    if(roomKey) {
      io.to(roomKey).emit(SEND_COMPLETE_MESSAGE, message);
      console.log(`IOS Client ${socket.id} sent complete message to room ${roomKey}`);
    }
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
