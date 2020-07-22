const express = require('express');
const logsService = require('./logs-service');


const logsRouter = express.Router();
const jsonParser = express.json();

logsRouter
    .route('/')
    .get((req, res, next) => { 
        const knexInstance = req.app.get('db')
        logsService.getAllLogs(knexInstance)
            .then(logs => {
                res.json(logs)
            })
            .catch(next)
    })

logsRouter
    .route('/:log_id')
    .get((req, res, next) => { 
        const knexInstance = req.app.get('db')
        logsService.getAllLogs(knexInstance)
            .then(logs => {
                res.json(logs)
            })
            .catch(next)
    })



module.exports = logsRouter; 