const express = require('express');
const logsService = require('./logs-service');
const logsRouter = express.Router();
const jsonParser = express.json();
const xss = require('xss');
const path = require('path');

const serializeLog = log => ({
    id: log.id,
    name: xss(log.wout_name),
    set: log.set,
    rep: log.rep,
    weight: log.weight,
    user_id: log.user_id,
    date_added: log.date_added
});
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
    .post(jsonParser, (req, res, next) => {
        const { wout_name, set, rep, weight, user_id, date_added} = req.body
        const newLog = { wout_name, set, rep, weight, user_id, date_added }

        for (const [key , value] of Object.entries(newLog))
            if(value == null)
                return res.status(400).json({
                    error: { message: `Missing '${key}' in request body` }
        })
        logsService.insertLog(req.app.get('db'), newLog)
        .then((newLog) => {
            res.status(201)
            .json(serializeLog(newLog));
            })
            .catch(next);
            console.log(res);
    });
logsRouter
    .route('/:log_id')


module.exports = logsRouter; 