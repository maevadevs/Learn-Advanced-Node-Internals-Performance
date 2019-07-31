// To start this file using pm2:
//
//  1. Make sure that pm2 is installed locally: yarn add pm2
// `2. Add script: "pm2": "pm2"
//  3. Run: yarn pm2 start filename.js -i instancesCount
//
// instancesCount: Put 0 to let pm2 figure it out. (Default = Count of logical cpus)

// PM2 COMMANDS
// ------------
//   pm2 list                Check list of running instances and their health
//   pm2 show [App name/id]  Get detailed info about the running app
//   pm2 monit               Dashboard for monitoring
//   pm2 delete [App name]   Stop all running processes related to the app

// DEPENDENCIES
// ************

const express = require('express')
const { pbkdf2 } = require('crypto')

// EXPRESS INSTANCE
// ****************

const app = express()

// ROUTES
// ******

app.get('/', (req, res) => {
  // Heavy work: Hashing
  // pbkdf2 is a hashing algorithm that is part of the Standard lib of Node
  pbkdf2('a', 'b', 100000, 512, 'SHA512', () => {
    res.send('Hash calculation finished')
  })
})

app.get('/fast', (req, res) => {
  res.send('done already!')
})

// LISTEN
// ******

app.listen(3000)
