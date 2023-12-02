module.exports = {
  IOS_CONNECTION: 'IOS Connection', // IOS -> NodeJS: El cliente iOS se conecta al servidor
  ROOM_CREATION: 'Room Creation', //  NodeJS -> IOS: El servidor envía la clave del room al cliente iOS
  ROOM_CONNECTION_VERIFICATION: 'Room Connection Verification', // Web -> NodeJS: El cliente web verifica si el room existe
  ROOM_CONNECTION: "Connect to Room", // Web -> NodeJS: El cliente web se conecta al room
  SAVE_MESSAGES_CONFIRMATION: "Save Messages Confirmation", // Web -> NodeJS -> IOS: El cliente web confirma si se puede guardar o no la conversacion en la base de datos
  REQUEST_CONSULTATION_DATA: "Request Consultation Data", // Web -> NodeJS -> IOS: El cliente web solicita los datos de la consulta
  SEND_CONSULTATION_DATA: "Send Consultation Data", // IOS -> NodeJS -> Web: El cliente iOS envia los datos de la consulta
  UPDATE_MESSAGE: "Update Message", // Web -> NodeJS -> IOS: El cliente web envia el mensaje actualizado


  SEND_COMPLETE_MESSAGE: "Send Complete Message", // IOS -> NodeJS -> Web: El cliente iOS envia el mensaje completo que se escribió
  SEND_MESSAGE_BEING_WRITTEN: "Send Message Being Written", // IOS -> NodeJS -> Web: El cliente iOS envia el mensaje que se está escribiendo





  ROOM_CLOSED: 'Room Closed', // NodeJS -> Web: El servidor envía la señal al cliente web de que el room se cerró
};
