const express = require("express");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
dotenv.config();

const port = process.env.PORT;

// Routes
app.use(require("./routes/routes"));





app.listen(port, () => {
  console.log("Server is running on port 3000");
})
