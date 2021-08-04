require('dotenv').config();
const knex = require('knex');
const logsService = require('../src/logs/logs-service')
const app = require('../src/app');

describe(`Logs service object`, function() {
        let db
        let testUsers = [
            {
              id: 1,
              username: 'lily',
              password:'$2a$12$bfT51PX60dNdSXkX3nRTzOdpThGOlmfG6Jwba11wqEWWdJAIAQ9i2',
            },
        ];
        let testLogs =[
             {
                log_id: 2,
                wout_name: 'lunges',
                set: 1,
                rep: 10,
                weight: 20,
                user_id: 1,
                date_added: new Date()
             },
        ];
        before(() => {
            db = knex({
                client: 'pg',
                connection: process.env.TEST_DATABASE_URL,
            })
            app.set('db',db);
        })
        before('clean the tables before ', () => db.raw('TRUNCATE TABLE log_users, save_logs RESTART IDENTITY CASCADE'));
        afterEach('clean the tables afterEach', () =>  db.raw('TRUNCATE TABLE log_users, save_logs RESTART IDENTITY CASCADE'));
        after('disconnect from db',() => db.destroy()); 

        context(`Given 'save_logs' has data`, () => {
            before(() => {
                return db
                    .into('log_users')
                    .insert(testUsers)
            })
            before(() => {
                return db
                    .into('save_logs')
                    .insert(testLogs)
            })
        
        it(`getAllLogs() resolves all logs from 'save_logs' table`, () => {
            return logsService.getAllLogs(db)
                .then(actual => {
                 expect(actual).to.eql(testLogs)
            })
        })   
        it(`deleteLogs() remove a favorite by id`, () => {
            return logsService.deleteLog(db, '2');
    })
    
})
    context(`Given 'save_logss' has no data`, () => {
        beforeEach('get user ids', () => {
            return db
                .into('log_users')
                .insert(testUsers)
                .returning('id')
                .then((res) => {
                    userId1 = res[0];
            });
    })

    it(`getAllLogs() resolves an empty array`, () => {
        return logsService.getAllLogs(db)
            .then(actual => {
                expect(actual).to.eql([])
        });
    })
    it(`insert Log inserts a new log and resolves the new log with an 'id'`, () => {
        const newLog =  {
            log_id: 3,
            wout_name: 'leg lifts',
            set: 1,
            rep: 10,
            weight: 30,
            user_id: 1,
            date_added: new Date()
         };
        return logsService.insertLog(db, newLog);
     })
    })   
})