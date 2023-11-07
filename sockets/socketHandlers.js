const { v4: uuidv4 } = require('uuid');

const {
  IOS_CONNECTION,
  ROOM_CREATION,


  NODEJS_SERVER_PORT,
  IOS_CLIENT_PORT,
} = require('./socketEvents');



const registerSocketHandlers = (io, socket) => {
  socket.on(IOS_CONNECTION, () => {
    console.log(`iOS Client connected: ${socket.id}`);
    // generar una clave unica para el room
    const uniqueRoomKey = uuidv4();
    // unir al socket al room
    socket.join(uniqueRoomKey);
    // enviar un mensaje al cliente iOS con la clave del room
    io.to(socket.id).emit(ROOM_CREATION, { roomKey: uniqueRoomKey });


    console.log(`IOS Client ${socket.id} joined room ${uniqueRoomKey}`);
  });

  // Aquí puedes agregar más manejadores de eventos según sea necesario
};

module.exports = registerSocketHandlers;
