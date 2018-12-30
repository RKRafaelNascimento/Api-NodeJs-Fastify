const fastify = require('fastify')({ logger: true })
const port = 3000

const start = async () => {
  try {
    await fastify.listen(port, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
    console.log(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
