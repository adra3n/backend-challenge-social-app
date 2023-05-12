const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('../api/server')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config')

const newUser = {
  username: 'ahmet',
  email: 'ahmet@ahmet.com',
  password: '1234',
}
const wrongUser = {
  username: 'haydar',
  email: 'haydar@haydar.com',
  password: '1231224',
}

const newAdmin = {
  username: 'mehmet',
  email: 'mehmet@mehmet.com',
  password: '1234',
  role_id: 1,
}

const user2 = {
  username: 'volkan',
  password: '1234',
  email: 'volkan@gmail.com',
}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

test('check env', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('_______ /auth tests________', () => {
  describe('/register', () => {
    test('[1] register new user with role_id', async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send(newAdmin)
      expect(res.body.message).toMatch(/Welcome/)
    })
    test('[2] register new user with no role_id', async () => {
      const res = await request(server).post('/api/auth/register').send(newUser)
      expect(res.body.message).toMatch(/Welcome/)
    })
  })

  describe('/LOGIN', () => {
    beforeEach(async () => {
      let token
      await request(server).post('/api/auth/register').send(newAdmin)
      const res = await request(server).post('/api/auth/login').send(newAdmin)

      token = res.headers.authorization
    })

    test('[1] login with correct credentials', async () => {
      const res = await request(server).post('/api/auth/login').send(newAdmin)
      expect(res.body.message).toMatch(/Welcome/)
    })
    test('[2] login with incorrect credentials', async () => {
      const res = await request(server).post('/api/auth/login').send(wrongUser)
      expect(res.body.message).toMatch(/Invalid Credentials/)
    })
  })
})

// describe('____/users tests_____', () => {
//   beforeEach(async () => {
//     await request(server).post('/api/auth/login').send(user2)
//   })

//   test('[1] get user with id', async () => {
//     const res = await request(server).get('/api/users/2')
//     console.log(res.body, '_______res.body________')
//     expect(res.body.username).toMatch('volkan')
//   })
// })
