const bcrypt = require('bcryptjs');
const xss = require('xss');

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
const UsersService = {
    getAllUsers(knex){
        return knex.select('*')
            .from('log_users')
    },
    hasUserWithUserName(db, username) {
        return db('log_users')
          .where({ username })
          .first()
          .then(user => !!user);
      },
    getById(knex,id){
        return knex
            .from('log_users')
            .select('*')
            .where('id',id)
            .first();
    },
    insertUser(knex, newUser) {
        return knex
            .insert({
                username: `${newUser.username}`,
                password:`${newUser.password}`
            })
            .into('log_users')
            .returning('*')
            .then(rows => {
                return rows[0];
            })
    },

      hashPassword(password) {
        return bcrypt.hash(password, 12);
      },
      serializeUser(user) {
        return {
          id: user.id,
          username: xss(user.username),

        };
      },
}

module.exports = UsersService;