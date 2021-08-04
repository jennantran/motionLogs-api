const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Cookie set"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Cookie set')
  })
})