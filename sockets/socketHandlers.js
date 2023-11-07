const {
  NODEJS_SERVER_PORT,
  IOS_CLIENT_PORT,
} = require('./socketEvents');

const registerSocketHandlers = (io, socket) => {
  socket.on(NODEJS_SERVER_PORT, (data) => {
    console.log(data);
    io.emit(IOS_CLIENT_PORT, { msg: "Hello from NodeJS Server" });
  });

  // Aquí puedes agregar más manejadores de eventos según sea necesario
};

module.exports = registerSocketHandlers;
