const { UserService } = require('../services/index')
const { createUser, authUser } = require('../schemas/user-schema')

async function routes (fastify, options) {
  fastify.get(
    '/user/find',
    { beforeHandler: [fastify.authenticate] },
    async (request, reply) => {
      let response
      try {
        response = await UserService.findUser()
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
    }
  )

  fastify.post(
    '/user/create',
    { schema: createUser },
    async (request, reply) => {
      let response
      try {
        response = await UserService.createUser(
          request.body.username,
          request.body.password,
          request.body.email
        )
        reply.status(201).send(response)
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
    }
  )

  fastify.post('/user/auth', { schema: authUser }, async (request, reply) => {
    let response
    try {
      response = await UserService.auth(
        request.body.email,
        request.body.password
      )
      reply.status(200).send(response)
    } catch (err) {
      reply.status(401).send({
        message: 'Usuario Invalido'
      })
    }
  })

  fastify.put(
    '/user/update',
    { beforeHandler: [fastify.authenticate] },
    async (request, reply) => {
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
    }
  )

  fastify.delete(
    '/user/delete/:id',
    { beforeHandler: [fastify.authenticate] },
    async (request, reply) => {
      let response
      try {
        response = await UserService.delete(request.params.id)
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
    }
  )
}

module.exports = routes
