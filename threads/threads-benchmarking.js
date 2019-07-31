// IS NODE REALLY SINGLE THREADED ?
// ********************************
// The Node Event Loop is Single Threaded
// However, some of Node's Std Lib are NOT single-threaded

// Modifying the threadpool size
// Default is 4. Absolute maximun is 128
// Docs: http://docs.libuv.org/en/latest/threadpool.html

process.env.UV_THREADPOOL_SIZE = 4

// DEPENDENCIES
// ************

const { pbkdf2 } = require('crypto')
const os = require('os')

// Listing available cpus
// By default, each core can handle 2 threads
// So a dual-core computer can handle 4 threads

// console.log('cpus Count:', os.cpus().length)
// console.log('cpus', os.cpus())

// Benchmarking using this base-time
let startTime = Date.now()

// pbkdf2 is a hashing algorithm that is part of the Standard lib of Node
pbkdf2('a', 'b', 100000, 512, 'SHA512', () => {
  console.log('#1 took', Date.now() - startTime, 'ms')
}) 
// => ~900 ms by itself
// => ~950 with 2 hash calculations
// => ~1400 with 3 hash calculations
// => ~1800 with 4 hash calculations

pbkdf2('a', 'b', 100000, 512, 'SHA512', () => {
  console.log('#2 took', Date.now() - startTime, 'ms')
})
// => ~950 with 2 hash calculations
// => ~1400 with 3 hash calculations
// => ~1800 with 4 hash calculations

pbkdf2('a', 'b', 100000, 512, 'SHA512', () => {
  console.log('#3 took', Date.now() - startTime, 'ms')
})
// => ~1400 with 3 hash calculations
// => ~1800 with 4 hash calculations

pbkdf2('a', 'b', 100000, 512, 'SHA512', () => {
  console.log('#4 took', Date.now() - startTime, 'ms')
})
// => ~1800 with 4 hash calculations

pbkdf2('a', 'b', 100000, 512, 'SHA512', () => {
  console.log('#5 took', Date.now() - startTime, 'ms')
}) // 2600 ms

// If Node was really single threaded, the amount of time would be additive: > 4000 ms
// But both calls actually completed at about the same time

// For some Standard Library, libuv (C++) takes care of all calculations
// They are using the Thread Pool
// By default, libuv create 4 default threads in the thread pool
// When using more than 4, the time taken to run will be doubled
