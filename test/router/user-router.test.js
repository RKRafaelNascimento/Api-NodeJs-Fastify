const request = require('supertest')
require('jest')

let authHeader =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InVzZXJhZG0iLCJpYXQiOjE1NDY1MTYwMTF9.V6h1yD1qy1oZb6UKojjeaC--fzWjyTS9HD8UV3G5wUc'
let address = 'http://localhost:3000'
let id

describe('User Router', () => {
  describe('/user/find', () => {
    it('User FindAll statusCode - Sucess', async () => {
      let { text, statusCode } = await request(address)
        .get('/user/find')
        .set('Authorization', authHeader)

      const { error } = JSON.parse(text)

      expect(statusCode).toBe(200)
      expect(error).toBeFalsy()
    }),
    it('User FindAll Invalid Token - Error', async () => {
      let { text, statusCode } = await request(address)
        .get('/user/find')
        .set('Authorization', 'Invalid Token')

      const { error } = JSON.parse(text)

      expect(statusCode).toBe(400)
      expect(error).toBeTruthy()
    })
  }),
  describe('/user/create', () => {
    it('User create statusCode - Sucess', async () => {
      let response = await request(address)
        .post('/user/create')
        .set('Authorization', authHeader)
        .send({
          username: 'UsuarioTeste',
          password: '12345',
          email: 'UsuarioTeste@usertest.com.br'
        })

      id = response.body.id

      expect(response.statusCode).toBe(201)
      expect(response.body.id).toBeDefined()
      expect(response.body.email).toBe('UsuarioTeste@usertest.com.br')
      expect(response.body.password).toBe('******')
    }),
    it('User create Invalid Token - Error', async () => {
      let { text, statusCode } = await request(address)
        .post('/user/create')
        .set('Authorization', 'Invalid Token')

      const { error } = JSON.parse(text)

      expect(statusCode).toBe(400)
      expect(error).toBeTruthy()
    }),
    it('User create Invalid parameter - Error', async () => {
      let { text, statusCode } = await request(address)
        .post('/user/create')
        .set('Authorization', 'Invalid Token')
        .send({
          username: 'dwdsrafael',
          password: '1AAA2345',
          email: '213213213232'
        })

      const { error } = JSON.parse(text)

      expect(statusCode).toBe(500)
      expect(error).toBeTruthy()
    }),
    it('User create Email Invalid - Error', async () => {
      let { text, statusCode } = await request(address)
        .post('/user/create')
        .set('Authorization', authHeader)
        .send({
          username: 'dwdsrafael',
          password: '1AAA2345',
          email: 'dasdasdadas'
        })

      const { error } = JSON.parse(text)

      expect(statusCode).toBe(500)
      expect(error).toBeTruthy()
    })
  }),
  describe('/user/auth', () => {
    it('User authenticante statusCode token ToBeDefined - Sucess', async () => {
      let response = await request(address)
        .post('/user/auth')
        .set('Authorization', authHeader)
        .send({
          email: 'UsuarioTeste@usertest.com.br',
          password: '12345'
        })

      expect(response.statusCode).toBe(200)
      expect(response.body.password).toBeUndefined()
      expect(response.body.token).toBeDefined()
    }),
    it('User authenticante Invalid Token - Error', async () => {
      let { text, statusCode } = await request(address)
        .post('/user/auth')
        .set('Authorization', 'Invalid Token')
        .send({
          email: '',
          password: 123
        })

      expect(statusCode).toBe(401)
    }),
    it('User authenticante Invalid password - Error', async () => {
      let { text, statusCode } = await request(address)
        .post('/user/auth')
        .set('Authorization', authHeader)
        .send({
          email: '',
          password: 2341
        })

      expect(statusCode).toBe(401)
    })
  }),
  describe('/user/delete/:id', () => {
    it('User delete statusCode - Sucess', async () => {
      let response = await request(address)
        .delete(`/user/delete/${id}`)
        .set('Authorization', authHeader)

      expect(response.statusCode).toBe(200)
    }),
    it('User delete Invalid Token - Error', async () => {
      let response = await request(address)
        .delete(`/user/delete/${id}`)
        .set('Authorization', 'Invalid Token')

      expect(response.statusCode).toBe(400)
    })
  })
})
