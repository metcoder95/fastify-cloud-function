'use strict'
const { createServer } = require('http')
const fp = require('fastify-plugin')

function FastifyCloudFunction (fastify, options, done) {
  fastify.addContentTypeParser('application/json', {}, (req, body, done) => {
    done(null, body.body)
  })

  fastify.decorate('handler', functionHandler.bind(fastify))

  async function functionHandler (iRequest, oResponse) {
    const {
      raw: { req, res },
      headers,
      statusCode,
      statusMessage,
      rawPayload,
      payload,
      trailers,
      cookies
    } = await this.inject({
      method: iRequest.method,
      url: iRequest.url,
      headers: iRequest.headers,
      payload: iRequest.body
    })

    console.log('(Inject) Request', req)
    console.log('(Inject) Reply', req)
    console.log('(Incoming) Request', iRequest)
    console.log('(Outgoing) Reply', oResponse)

    res.send('ok')
  }
}

module.exports = fp(FastifyCloudFunction)
