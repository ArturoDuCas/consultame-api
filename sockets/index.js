const socketIO = require('socket.io');
const { instrument } = require("@socket.io/admin-ui");
const registerSocketHandlers = require('./socketHandlers');


const initializeSocketServer = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: ["https://admin.socket.io", "http://localhost:5173", "http://localhost:5174"],
      credentials: true
    }
  });

  instrument(io, {
    auth: false,
    mode: process.env.NODE_ENV === "development" ? "development" : "production",
  });


  io.on('connection', (socket) => {
    console.log(`Connected: ${socket.id}`);

    registerSocketHandlers(io, socket);

  });

  return io;
};

module.exports = initializeSocketServer;
