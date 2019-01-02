const { UserService } = require('../services/index')

async function routes (fastify, options) {
  fastify.get('/user/find', async (request, reply) => {
    let response
    try {
      response = await UserService.findUser()
      reply.send(response)
    } catch (err) {
      response = {
        error: 'Uncaught server error: ' + JSON.stringify(err)
      }
      let errorCode = 500
      if (err.code != null) {
        errorCode = err.code
      }
      reply.code(errorCode).send(response)
    }
  })

  fastify.post('/user/create', async (request, reply) => {
    let response
    try {
      response = await UserService.createUser(
        request.body.username,
        request.body.password,
        request.body.email
      )
      reply.send(response)
    } catch (err) {
      response = {
        error: 'Uncaught server error: ' + JSON.stringify(err)
      }
      let errorCode = 500
      if (err.code != null) {
        errorCode = err.code
      }
      reply.code(errorCode).send(response)
    }
  })

  fastify.post('/user/auth', async (request, reply) => {
    let response
    try {
      response = await UserService.auth(
        request.body.email,
        request.body.password
      )
      const token = fastify.jwt.sign({
        id: response.data.id,
        name: response.data.name
      })
      response.token = token
      reply.status(200).send(response)
    } catch (err) {
      response = {
        error: 'Uncaught server error: ' + JSON.stringify(err)
      }
      let errorCode = 500
      if (err.code != null) {
        errorCode = err.code
      }
      reply.code(errorCode).send(response)
    }
  })

  fastify.put('/user/update', async (request, reply) => {
    let response
    try {
      response = await UserService.update(
        request.body.username,
        request.body.password,
        request.body.email
      )
      reply.send(response)
    } catch (err) {
      response = {
        error: 'Uncaught server error: ' + JSON.stringify(err)
      }
      let errorCode = 500
      if (err.code != null) {
        errorCode = err.code
      }
      reply.code(errorCode).send(response)
    }
  })

  fastify.delete('/user/delete', async (request, reply) => {
    let response
    try {
      response = await UserService.delete(request.body.id)
      reply.send(response)
    } catch (err) {
      response = {
        error: 'Uncaught server error: ' + JSON.stringify(err)
      }
      let errorCode = 500
      if (err.code != null) {
        errorCode = err.code
      }
      reply.code(errorCode).send(response)
    }
  })
}

module.exports = routes
