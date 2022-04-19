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
//ENS, GTC, DAI, WETH, RPL

//0xDa93c8286C47990e922406016f7eeDdbE41d9702
//FWB, INDEX, LINK, GRID

//0x4ae0EB1Ec41A0d420fD363f0fE9E0ce4fb0D1300
//RPL
