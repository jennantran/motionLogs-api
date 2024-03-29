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


app.use(cors());



app.get('/', (req, res) => {
    res.cookie('myCookie','express').send('Cookie set');
})
  
const morganOption = (NODE_ENV === 'production')
? 'tiny'
: 'common';

app.get('/logs', (req, res, next) => {
    res.send('All logs');
})


app.use(morgan(morganOption));

app.use(helmet());


app.use('/api/logs', logsRouter);
app.use('/api/signup', usersRouter);
app.use('/api/auth', authRouter);


module.exports = app;