const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
dotenv.config();
app.use(cors({ origin: 'http://localhost:5173' }));

const port = process.env.PORT;

app.use(express.static("public")); // for serving static files
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Routes
app.use(require("./routes/routes"));


// Socket.io
connections = [];
io.on('connection', (socket) => {
  connections.push(socket);
  console.log(`Connected: ${connections.length} sockets connected`)

  // Disconnect
  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1);
    console.log(`Disconnected: ${connections.length} sockets connected`);
  });

  socket.on("NodeJS Server Port", (data) => {
    console.log(data);
    io.emit("iOS Client Port", {
      msg: "Hello from NodeJS Server"
    });
  });


});


app.listen(port, () => {
  console.log("Server is running on port " + port + "...");
})
