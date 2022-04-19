const { INFURA_KEY } = process.env
const Web3 = require('web3');
require('dotenv').config();
const web3 = new Web3("https://mainnet.infura.io/v3/"+process.env.INFURA_KEY);
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

let addressGlobalID = 1
let tokenGlobalID = 1
const addresses = require(`./db.json`)
const tokens = require(`./tokenBals.json`)
const uniswapPrice = require('uniswap-price')
const staticCGDB = require ('./coingecko-coinlist.json')

module.exports = {
    checkBalance: (req, res) => {
        
        let { address, nickname } = req.body
        
        let newAddress = {
            id: addressGlobalID,
            address,
            nickname,
            "balance": 0,
        }
        
        addressGlobalID++

        try {
            web3.eth.getBalance(address)
            .then((balanceInWei) => {
                balance = web3.utils.fromWei(balanceInWei);
                newAddress.balance = parseFloat(balance)
                addresses.push(newAddress)
                res.status(200).send(addresses)
                
            })
        } catch(err) {
            console.log(err);
        }        
    },

    printAddresses: (req, res) => {
        res.status(200).send(addresses)
    },

    tokenBalance: async (req, res) => {

        let { ticker } = req.body

        for (let i = 0; i < addresses.length; i++) {

            let addr = addresses[i].address
    
            let coin = ''
    
            let tokenBal = {
                id: tokenGlobalID,
                ticker,
                coingeckoID: '',
                addr,
                contractAddr: '',
                "balance": 0,
                "USDprice": 0
            }
    
            tokenGlobalID++
        
            // let page = 1
            // let coinList = []

            // for (let i = 0; i < 20; i++) {
        
            //     let response = await CoinGeckoClient.coins.all({order: 'market_cap_desc', page: page})
            //     response = response.data
            //     coinList = coinList.concat(response)

            //     page++
            // }
        
            // for (let i = 0; i < coinList.length; i++) {
            //     ticker = ticker.toUpperCase()
            //     DBticker = coinList[i].symbol.toUpperCase()
            //     console.log(DBticker)
            //     if (ticker === DBticker) {
            //         let coinID = coinList[i].id
            //         tokenBal.coingeckoID = coinID
            //     }
            // }

            // console.log('coingeckoid: ', tokenBal.coingeckoID)
            

            
            for (let i = 0; i < staticCGDB.length; i++) {
                if (ticker.toUpperCase() === staticCGDB[i].symbol.toUpperCase()) {
                    tokenBal.coingeckoID = staticCGDB[i].id
                }
            }
            

            console.log('!!!! coingeckoid: ', tokenBal.coingeckoID)

        
            let response = await CoinGeckoClient.coins.fetch(tokenBal.coingeckoID)
            try { let contractAddr = response.data.platforms.ethereum
            tokenBal.contractAddr = contractAddr 
            } catch(err) {
                continue
            }
        
            let data = await CoinGeckoClient.coins.fetch(tokenBal.coingeckoID, {})
            let price = data.data.market_data.current_price.usd
            tokenBal.USDprice = price
            
            // get token balance from the blockchain
            var tknAddr = (tokenBal.addr).substring(2);
            var contractData = ('0x70a08231000000000000000000000000' + tknAddr);
            
            await web3.eth.call({
                to: tokenBal.contractAddr, // Contract address, used call the token balance of the address in question
                data: contractData // Combination of contractData and tknAddress, required to call the balance of an address 
            }, function(err, result) {
                if (result) { 
                    var tokens = web3.utils.toBN(result).toString(); // Convert the result to a usable number string
                    bal = web3.utils.fromWei(tokens, 'ether')
                    console.log('Tokens Owned: ' + bal); // Change the string to be in Ether not Wei, and show it in the console
                    tokenBal.balance = parseFloat(bal)
                }
                else {
                    console.log(err); // Dump errors here
                }
                
            })
            
            tokens.push(tokenBal)
    
        }
    },


    sendTokenBals: (req, res) => {
        res.status(200).send(tokens)
    },

    printTokens: (req, res) => {
        tokenTickerList = []
        for (let i = 0; i < tokens.length; i++) {
            tokenTickerList.push(tokens[i].ticker)
        }
        res.status(200).send(tokenTickerList)
    },

    // ETH price estimated from the ETH/DAI price on uniswap
    ethPrice: async (req, res) => {
        let data

        data = await uniswapPrice.getExecutionPrice("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, "1000000000000000000", 1, process.env.INFURA_KEY)
        
        price = parseFloat(data)
        res.status(200).send({ price })
    }   
}