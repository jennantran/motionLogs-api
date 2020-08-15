const AuthService = require('../src/auth/auth-service');
const knex = require('knex')
const mocha = require('mocha');
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app');

describe('Auth Endpoints', function() {
    let db;
    let testUser = [
        {
            id: 1,
            username: 'Luke',
            password: 'password1',
        },
        {  
            id: 2,
            username: 'Annie',
            password: 'password2'
        }
    ]
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DATABASE_URL,
      });
      app.set('db', db);
    });
  
    after('disconnect from db', () => db.destroy());
    before('clean the tables before ', () => db.raw('TRUNCATE TABLE log_users RESTART IDENTITY CASCADE'));
    afterEach('clean the tables afterEach', () =>  db.raw('TRUNCATE TABLE save_logs RESTART IDENTITY CASCADE')); 
  

    context(`Given 'log users' has data`, () => {
        before(() => {
            return db
                .into('log_users')
                .insert(testUser)
            })
    
        it(`get user`, () => {
        return AuthService.getUserWithUserName(db,'Luke')
        .then(actual => {
        expect(actual).to.eql({
            id: 1,
            username: 'Luke',
            password: 'password1',
              })
            })
        })     
    })    
})