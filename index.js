const express = require("express");
const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV !== "production", // TODO: revisar esto, no seria seguro en produccion
})


app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
})

app.get("/ping", async (req, res) => {
  const result = await pool.query("SELECT NOW()")
  return res.json(result.rows[0])
})



app.listen(3000)
console.log("Server is running on port 3000");
