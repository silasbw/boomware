# boomware

Opinionated Boom-based wrapper for asynchronous middleware.

## Installing

```
npm i boomware
```

## Example

```js
const boomware = require('boomware')
const express = require('express')

const app = express()
 
app.get('/', boomware(async (req, res) => {
  if (Math.random() > 0.5) throw('Unexpected error!')
  req.sen('OK!')
}))
```

## API

### `boomware(fn)`

Returns a middleware function that catches a thrown error, wraps it
in an [`Boom.badImplementation`](https://www.npmjs.com/package/boom#boombadimplementationmessage-data----alias-internal-)
if it's not already a Boom error, and passes it to the `next()`
function.

## References

* [Using Async Await in Express with Node 9](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016)
* [async-middleware](https://www.npmjs.com/package/async-middleware)

## License

[MIT](LICENSE)
