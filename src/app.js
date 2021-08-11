require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const logsRouter = require('./logs/logs-router');
const usersRouter = require('./users/users-router');
const errorHandler = require('./error-handler');
const authRouter = require('./auth/auth-router');
const app = express();
const cookieParser = require('cookie-parser');
var timeout = require('connect-timeout')


app.use(timeout('5s'))
app.use(cookieParser());
app.use(haltOnTimedout)
app.use(cors())
app.use(haltOnTimedout)

app.get('/', (req, res) => {
    res.cookie('myCookie','express').send('Cookie set');
})
  
const morganOption = (NODE_ENV === 'production')
? 'tiny'
: 'common';

// app.get('/logs', (req, res, next) => {
//     res.send('All logs');
// })

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(haltOnTimedout)

app.use(morgan(morganOption));
app.use(haltOnTimedout)
app.use(helmet());
app.use(haltOnTimedout)

app.use('/api/logs', logsRouter);
app.use('/api/signup', usersRouter);
app.use('/api/auth', authRouter);

// app.use(errorHandler);
function haltOnTimedout (req, res, next) {
    if (!req.timedout) next()
  }

module.exports = app;