module.exports = {
  IOS_CONNECTION: 'IOS Connection', // IOS -> NodeJS: El cliente iOS se conecta al servidor
  ROOM_CREATION: 'Room Creation', //  NodeJS -> IOS: El servidor envía la clave del room al cliente iOS
  ROOM_CONNECTION_VERIFICATION: 'Room Connection Verification', // Web -> NodeJS: El cliente web verifica si el room existe
  ROOM_CONNECTION: "Connect to Room", // Web -> NodeJS: El cliente web se conecta al room
  MESSAGE_TO_WEB: "Message to Web", // IOS -> NodeJS -> Web: El cliente iOS envía un mensaje al cliente web
  SAVE_MESSAGES_CONFIRMATION: "Save Messages Confirmation", // Web -> NodeJS -> IOS: El cliente web confirma si se puede guardar o no la conversacion en la base de datos

  ROOM_CLOSED: 'Room Closed', // NodeJS -> Web: El servidor envía la señal al cliente web de que el room se cerró
};
