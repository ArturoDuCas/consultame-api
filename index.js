const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const initializeSocketServer = require("./sockets");


const app = express();
const server = http.createServer(app);


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use(cors({ origin: 'http://localhost:5173' }));
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  }
}));

dotenv.config();


app.use(express.static("public")); // for serving static files
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Routes
app.use(require("./routes/routes"));

// Socket.io
const io = initializeSocketServer(server);



const port = process.env.PORT;

server.listen(port, () => {
  console.log("Server is running on port " + port + "...");
})
