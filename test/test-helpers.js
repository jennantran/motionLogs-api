const bcrypt = require('bcryptjs')

function cleanTables(db) {
    return db.raw(
        `TRUNCATE
            log_users,
            save_logs,
            RESTART IDENTITY CASCADE
          `
      )
  }

module.exports = { 
    cleanTables
}