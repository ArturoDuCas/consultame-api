const express = require("express");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
dotenv.config();

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
