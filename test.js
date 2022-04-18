const { INFURA_KEY } = process.env
const Web3 = require('web3');
require('dotenv').config();
const web3 = new Web3("https://mainnet.infura.io/v3/"+process.env.INFURA_KEY);
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

let tokenGlobalID = 4
const tokens = require(`./server/tokenBals.json`)
const addresses = require(`./server/db.json`);
const { ORDER } = require('coingecko-api');

const tokenBalance = async () => {


    for (let i = 0; i < 10; i++) {

        let response = await CoinGeckoClient.coins.list();
        console.log(response)

        // for (let j = 0; j < coinList.length; j++) {
        //     console.log(response[j].id)
        // }

    }


    // console.log(coinList[466])
}



console.log(tokenBalance())



















// const coingeckoCoinList = require('./server/coingecko-coinlist.json')

// const getContractAddr = async (ticker) => {

//     coin = ''
    
//     let coinList = await CoinGeckoClient.coins.list()
//     coin = ''

//     for (let i = 0; i < coinList.data.length; i++) {
//         ticker = ticker.toLowerCase()
//         if (ticker === coinList.data[i].symbol) {
//             let coinID = coinList.data[i].id
//             coin = coinID
//         }
//     }

//     let res = await CoinGeckoClient.coins.fetch(coin)
//     let contractAddr = res.data.platforms.ethereum
//     return contractAddr
// }

// getCoinPrice('MATIC')