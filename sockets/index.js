const socketIO = require('socket.io');
const registerSocketHandlers = require('./socketHandlers');

const initializeSocketServer = (server) => {
  const io = socketIO(server);

  io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);

    registerSocketHandlers(io, socket);

    socket.on('disconnect', () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = initializeSocketServer;
