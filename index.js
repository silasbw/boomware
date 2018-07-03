const boom = require('boom')

module.exports = function wrap (fn) {
  return function (req, res, next) {
    fn(req, res, next)
      .catch(err => {
        if (!err.isBoom) return next(boom.badImplementation(err))
        next(err)
      })
  }
}
