const path = require('path');
const express = require('express');
const xss = require('xss');
const UsersService = require('./users-service');
const usersRouter = express.Router();
const jsonParser = express.json();

const serializeUser = username => ({
  username: xss(username.username),
  password: xss(username.password)
});

usersRouter
  .post('/', jsonParser, (req, res, next) => {
    const { password, username } = req.body;
 
    UsersService.hasUserWithUserName(
      req.app.get('db'),
      username.value,
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` });

        return UsersService.hashPassword(password.value)
          .then(hashedPassword => {
            const newUser = {
              username: username.value,
              password: hashedPassword,
            }
            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(username => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${username.id}`))
                  .json(UsersService.serializeUser(username));
              })
          })
      })
      .catch(next);
  })
module.exports = usersRouter;