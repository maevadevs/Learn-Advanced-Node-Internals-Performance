// DEPENDENCIES
// ************

const cluster = require('cluster')
const os = require('os')
const express = require('express')
const { pbkdf2 } = require('crypto')

// CLUSTERING
// **********

process.env.UV_THREADPOOL_SIZE = os.cpus().length
const threadpoolSize = os.cpus().length

if (cluster.isMaster) {
  // FORKING
  // *******
  // Fork children instances of index.js
  // Each forked children is a node app on its own
  for (let i = 0; i < threadpoolSize; i++) cluster.fork()
} else {

  // EXPRESS INSTANCE
  // ****************
  // This will apply to each child node

  const app = express()

  // ROUTES
  // ******

  app.get('/', (req, res) => {
    // Heavy work: Hashing
    // pbkdf2 is a hashing algorithm that is part of the Standard lib of Node
    pbkdf2('a', 'b', 1000000, 512, 'SHA512', () => {
      res.send('Hash calculation finished')
    })
  })

  app.get('/fast', (req, res) => {
    res.send('done already!')
  })

  // LISTEN
  // ******

  app.listen(3000, () => console.log('server is running on port 3000...'))
}
