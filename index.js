const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
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





app.listen(port, () => {
  console.log("Server is running on port " + port + "...");
})
