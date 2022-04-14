const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const { checkBalance, printAddresses, tokenBalance } = require(`./eth.js`)

// other endpoints
app.get(`/`, printAddresses)
app.post(`/api/balances`, checkBalance)
app.post(`/api/tokenBal`, tokenBalance)

const PORT = process.env.PORT || 4005

app.listen(PORT,() => { console.log(`Listening on ${PORT}`)})