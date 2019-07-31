// DEPENDENCIES
// ************

const express = require('express')

// SERVER CONFIG
// *************

const server = express()
const port = process.env.PORT || 8000 // Using Port 80 will needs sudo

// ROUTES
// ******

server.get('/blocking', (req, res) => {
  // This could be an array.length or some big number
  let heavyWork = 1e9
  // Heavy calculation here
  for (let i = 0; i < heavyWork; i++) {
    i * i * i
  }
  // Finally return
  res.send('done')
})

server.get('/blocked', (req, res) => {
  res.send('This route is blocked in the event loop by /blocking, but not by /non-blocking')
})

server.get('/non-blocking', (req, res) => {
  // This could be an array.length or some big number
  let heavyWork = 1e7
  // These 2 steps are necessary. Otherwise, we can't use reference in *loop()
  let generator = loop()
  generator.next()

  function *loop() {
    for (let i = 0; i < heavyWork; i++) {
      heavyWorker(yield setImmediate(() => {
        generator.next(i)
      }))
    }
  }

  function heavyWorker(x) {
    if (x === heavyWork - 1) res.send(`done at ${heavyWork - 1}`)
    return true
  }
})

// START LISTENING
// ***************

server.listen(port, () => console.log(`Express server is up on port ${port}...`))
