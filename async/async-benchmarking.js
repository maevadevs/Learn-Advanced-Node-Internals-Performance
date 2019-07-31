// DEPENDENCIES
// ************

const https = require('https')

// Benchmarking: start-time
const startTime = Date.now()

// HTTPS Request
const doRequest = () => {
  https.request('https://www.google.com', res => {
    res.on('data', () => {})
    res.on('end', () => console.log('req took', Date.now() - startTime, 'ms'))
  }).end()
}

// Testing
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()

// Async Requests are delegated directly to the OS Async feature
// So there is no blocking at all in the event loop
// The Async stuff bypass the event loop altogether
// Which is why the requests are all done about the same time

// All tasks listed under the PendingOSTasks are delegated this way
// Mostly anything networking, although it depends on the OS too
