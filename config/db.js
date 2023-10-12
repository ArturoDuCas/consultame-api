const pg = require("pg");
const dotenv = require("dotenv");
dotenv.config();


const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === "production" ? {} : { ssl: true }), // TODO: revisar esto, no seria seguro en produccion?
})

const queryPromise = (query, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, data) => {
      if(err) return reject(err);
      return resolve(data.rows);
    })
  })
}

module.exports = {
  pool,
  queryPromise
}