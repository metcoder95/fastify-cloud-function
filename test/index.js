const fastify = require('fastify')
const fastifyCloudFunction = require('..')

const app = fastify({ logger: true })

app.get('/', (_request, reply) => reply.send('Hello World!'))
app.post('/', (request, reply) => {
  reply.send(request.body)
})

app.register(fastifyCloudFunction)

module.exports.helloWorld = app.handler
