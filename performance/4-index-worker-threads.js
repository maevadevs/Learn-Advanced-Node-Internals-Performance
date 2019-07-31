// NOTE: Worker Threads is still in experimental phase with Node 10

// DEPENDENCIES
// ************

const express = require('express')
const { Worker } = require('webworker-threads')

// EXPRESS INSTANCE
// ****************

const app = express()

// ROUTES
// ******

app.get('/', (req, res) => {
  // This is a heavy work route: Delegate to a worker
  // New worker instance interface: Closure scope is different
  const worker = new Worker(workerInstanceSetup)

  // Interfaces to communicate with this worker instance
  //  worker.onmessage:
  //    - Receiving a message from the worker instance to the application
  //    - Define a function to be executed in the application when this happens
  //  postMessage(): Send message to the worker instance
  //    - This is how we send a message to the worker instance

  worker.onmessage = function (msg) { 
    console.log(msg)
    return res.send(msg) 
  }
  worker.postMessage()
})

app.get('/fast', (req, res) => res.send('done already!'))

// HELPER FUNCTION: SETUP WORKER
// *****************************

const workerInstanceSetup = function () {
  // 'this' here represents the thread
  this.onmessage = function () {
    // Do heavy work here
    let counter = 0;
    while (counter < 1e10) counter++
    // Post back the result when done
    // This will be picked up by the onmessage interface of the application
    postMessage(counter)
  }
}

// LISTEN
// ******

app.listen(3000, () => console.log('Running on port 3000...'))
