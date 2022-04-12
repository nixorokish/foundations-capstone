const express = require('express')
const path = require('path')
const addresses = []

const app = express()

const { checkBalance } = require(`./eth.js`)

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '35b13332aa544033bba0ac860d62c6a4',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

// app.use(express.static('public')) //static is css, js files, in front end etc.
// // works for pushing to heroku

// endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.post('/api/addresses', (req, res) => {
  let address = req.body
  addresses.push(address)
  console.log(addresses)
})

app.get('/api/balances', checkBalance)

const PORT = process.env.PORT || 4005

app.listen(PORT,() => { console.log(`Listening on ${PORT}`)})