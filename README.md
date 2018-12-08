# boomware

[![Greenkeeper badge](https://badges.greenkeeper.io/silasbw/boomware.svg)](https://greenkeeper.io/)

Opinionated [Boom](https://www.npmjs.com/package/boom)-based wrapper
for asynchronous middleware (or handler) for [Express](https://www.npmjs.com/package/express), [Connect](https://www.npmjs.com/package/connect), [router](https://www.npmjs.com/package/router), etc.

## Installing

```
npm i --save boomware
```

## Example

```js
const boom = require('boom')
const boomware = require('boomware')
const express = require('express')

const app = express()

// Middleware can return a Promise (but it doesn't have to)
app.get('/async', boomware(async (req, res) => {
  if (Math.random() > 0.75) throw('Unexpected error!')
  if (Math.random() > 0.5) throw boom.serverUnavailable()
  res.send('OK!')
}))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.output.statusCode).json(err.output.payload)
})

app.listen(3000)
```

## API

### `boomware(fn)`

Returns a middleware function that catches a thrown error, wraps it
in an [`Boom.badImplementation`](https://www.npmjs.com/package/boom#boombadimplementationmessage-data----alias-internal-)
if it's not already a Boom error, and passes it to the `next()`
function. `boomware` handles the case when`fn` return Promise, and the
case when `fn` does not return a Promise.

## Related work

* [Using Async Await in Express with Node 9](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016)
* [async-middleware](https://www.npmjs.com/package/async-middleware)

## License

[MIT](LICENSE)
