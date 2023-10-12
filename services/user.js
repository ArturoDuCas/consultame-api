const { queryPromise } = require('../config/db');

module.exports = {
    getAllUsers: (req, res) => {
      return queryPromise(
        `
          Select now() as fecha
        `
      )
    }
}