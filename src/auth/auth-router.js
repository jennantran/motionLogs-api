const express = require('express');
const AuthService = require('./auth-service');
const authRouter = express.Router();
const jsonBodyParser = express.json();
var timeout = require('connect-timeout')

  authRouter
    .post('/login', jsonBodyParser, (req, res, next) => {
      savePost(req.body, function (err, id) {
        if (err) return next(err)
        if (req.timedout) return
        res.send('saved as id ' + id)
      })
      
      const { username, password } = req.body;
      const loginUser = { username, password };

      for (const [key, value] of Object.entries(loginUser))
        if (value == null)
          return res.status(400).json({
            error: `Missing '${key}' in request body`
    });
    function haltOnTimedout (req, res, next) {
      if (!req.timedout) next()
    }
    
    function savePost (post, cb) {
      setTimeout(function () {
        cb(null, ((Math.random() * 40000) >>> 0))
      }, (Math.random() * 7000) >>> 0)
    }
    

    AuthService.getUserWithUserName(
       req.app.get('db'),
       loginUser.username,
     )
       .then(dbUser => {
         if (!dbUser)
         return res.status(400).json({
             error: 'Invalid password. Please login with valid credentials to access logs.'
        });
        return AuthService.comparePasswords(loginUser.password, dbUser.password)
        .then(compareMatch => {
            if (!compareMatch)
            return res.status(400).json({
                error: 'Invalid password. Please login with valid credentials to access logs.'
            })
            
           const sub = dbUser.username;
           const payload = { user_id: dbUser.id };
  
           res.send({
             authToken: AuthService.createJwt(sub, payload),
             user_id: dbUser.id,
           })
        })
    })
      .catch(next);
  })

  module.exports = authRouter;