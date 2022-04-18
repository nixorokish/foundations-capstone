const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const { checkBalance, printAddresses, tokenBalance, printTokens, sendTokenBals, ethPrice } = require(`./eth.js`)

// endpoints
app.get(`/api/printAddresses`, printAddresses)
app.get(`/api/printTokens`, printTokens)
app.get(`/api/tokenBals`, sendTokenBals)
app.get(`/api/ethPrice/`, ethPrice)

app.post(`/api/balances`, checkBalance)
app.post(`/api/tokenBal`, tokenBalance)

const PORT = process.env.PORT || 4005

app.listen(PORT,() => { console.log(`Listening on ${PORT}`)})


//test addresses:

//sassal.eth
//0x648aA14e4424e0825A5cE739C8C68610e143FB79