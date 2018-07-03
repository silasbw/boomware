/* eslint-env mocha */
const boom = require('boom')
const { expect } = require('chai')

const boomware = require('.')

describe('boomer', () => {
  it('handles thrown non-Boom errors', done => {
    const middleware = boomware((req, res, next) => {
      return Promise.reject(new Error('Doh!'))
    })
    middleware(null, null, err => {
      expect(err.isBoom)
      done()
    })
  })

  it('handles thrown Boom errors', done => {
    const middleware = boomware((req, res, next) => {
      return Promise.reject(boom.badRequest())
    })
    middleware(null, null, err => {
      expect(err.output.statusCode).to.equal(400)
      done()
    })
  })

  it('handles success', done => {
    const middleware = boomware((req, res, next) => {
      setImmediate(next)
      return Promise.resolve()
    })
    middleware(null, null, err => {
      expect(err).to.be.an('undefined')
      done()
    })
  })
})
