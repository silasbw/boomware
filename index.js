const boom = require('boom')

module.exports = function wrap (fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next))
      .catch(err => {
        if (err.isBoom) return next(err)
        next(boom.badImplementation(err))
      })
  }
}
