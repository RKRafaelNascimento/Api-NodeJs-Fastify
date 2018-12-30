const { UserService } = require('../services/index')

async function routes (fastify, options) {
  fastify.get('/user/find', async (request, reply) => {
    let response
    try {
      response = await UserService.findUser
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
