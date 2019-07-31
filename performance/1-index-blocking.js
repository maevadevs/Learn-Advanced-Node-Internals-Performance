// DEPENDENCIES
// ************

const express = require('express')

// EXPRESS INSTANCE
// ****************

const app = express()

// ROUTES
// ******

app.get('/', (req, res) => {
  doALotOfWork({ duration: 5000 })
  res.send({ message: 'Hi there!' })
})

app.get('/blocked', (req, res) => {
  res.send({ message: 'This route is blocked by / and cannot process until / finishes' })
})

// HELPER
// ******
// This is a simulation of a blocking function
// Using While Loop

function doALotOfWork ({ duration }) {
  const start = Date.now()
  while(Date.now() - start < duration) { /* A lot of work here */ }
}

// LISTEN
// ******

app.listen(3000, () => console.log('Listening on 3000...'))
