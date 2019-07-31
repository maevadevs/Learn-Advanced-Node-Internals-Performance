// DEPENDENCIES
// ************

const https = require('https')
const { pbkdf2 } = require('crypto')
const fs = require('fs')

// Benchmarking
const startTime = Date.now()

// HTTPS Request
const doRequest = () => {
  https.request('https://www.google.com', res => {
    res.on('data', () => {})
    res.on('end', () => {
      console.log('request took', Date.now() - startTime, 'ms')
    })
  }).end()
}

// Hashing with pbkdf2
const doHash = () => {
  // pbkdf2 is a hashing algorithm that is part of the Standard lib of Node
  pbkdf2('a', 'b', 100000, 512, 'SHA512', () => {
    console.log('hashing took', Date.now() - startTime, 'ms')
  }) // 2668 ms
}

// Operations order
// ****************

doRequest() // => 188 ms

// Reading file with fs
fs.readFile('multitask.js', 'utf8', () => {
  console.log('fs took', Date.now() - startTime, 'ms')
}) // => 40 ms

doHash() // => 2000ms
doHash() // => 2000ms
doHash() // => 2000ms
doHash() // => 2000ms

// RESULT
// ------
// request took 188 ms    ==> Does not touch the threadpool at all
// hashing took 2903 ms   ==> Hit the thread pool first
// fs took 2904 ms        ==> Hit the thread pool but had to make multiple routes: got blocked behind hashing
// hashing took 2908 ms   ==> Hit the thread pool
// hashing took 2929 ms   ==> Hit the thread pool
// hashing took 2959 ms   ==> Hit the thread pool
