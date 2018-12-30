const fastify = require('fastify')({ logger: true })
const sqlize = require('./services/sequelize')
const port = 3000
const routers = require('./routers/index')

fastify.register(require('fastify-cors'))

for (const i in routers) {
  fastify.register(routers[i])
}

const start = async () => {
  try {
    await sqlize.connectionManager.connect(sqlize.options)
    await fastify.listen(port, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
    console.log(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
