// ESM
import Fastify from 'fastify'
import fs from 'fs'

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  const stream = fs.createReadStream('./public/index.html')
  reply.type('text/html').send(stream)
})

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})