console.log('JS connected')

baseURL = `http://localhost:4005/`

const portfolioTableETH = document.querySelector('#portfolio-table-ETH')
const portfolioTableTokens = document.querySelector('#portfolio-table-tokens')
const ETHpriceDIV = document.querySelector('#ETHprice')
const netWorthDIV = document.querySelector('#put-net-here')
const ETHrow = document.querySelector('#ETH')
const portfolioHeaders = document.querySelector('#headers')

//calls api/ethPrice, .then creates p elem with "ETH price:"
const ETHprice = () => {
    axios
        .get(baseURL+'api/ethPrice/')
        .then(res => {
            let ETHprice = document.createElement('p')
            ETHprice.innerHTML = `ETH price: $${res.data.price}`
            ETHpriceDIV.appendChild(ETHprice)
        })
}

// calls api/printAddresses, .then calls fxns clearETHrow, populateETHbalance
function displPortfolio () {
    axios
        .get(baseURL+'api/printAddresses')
        .then(res => {
            clearETHrow()
            populateETHbalance(res)
        })
}

const clearETHrow = () => {
    portfolioHeaders.hidden = true
    ETHrow.hidden = true
    ETHrow.innerHTML = ``
}

// called inside dispPortfolio, sums ETH from addresses, creates a ETH row in ETH table
const populateETHbalance = async (res) => {
    if (res.data.length > 0) {
        portfolioHeaders.hidden = false
        ETHrow.hidden = false
    }
    
    var val = res.data.reduce(function(acc, cv) {
        return {
            balance: acc.balance + cv.balance
        }
    })
    
    let ETHticker = document.createElement('td')
    ETHticker.setAttribute('class', 'column-1')
    ETHticker.textContent = `ETH`
    ETHrow.appendChild(ETHticker)

    let ETHbal = document.createElement('td')
    ETHbal.textContent = (val.balance).toFixed(2)
    ETHrow.appendChild(ETHbal)

    let ETHprice = await returnETHprice()
    let totalVal = document.createElement('td')
    totalVal.id = 'ETHtotalval'
    totalVal.textContent = `$${((ETHprice)*val.balance).toFixed(2)}`
    ETHrow.appendChild(totalVal)


    let netWorth = await getNetWorth()
    let ETHinUSD = await getETHtotalAllAddrUSD()
    let percent = ((ETHinUSD / netWorth) * 100).toFixed(2)
    let child = document.createElement('td')
    child.textContent = `${percent}%`
    
    ETHrow.appendChild(child)
}

const getTokenTotalsInUSD = () => {
    return axios
        .get(baseURL + 'api/tokenBals')
        .then(res => {
            let total = 0
            for (let i = 0; i < res.data.length; i++) {
                total = total + (res.data[i].balance * res.data[i].USDprice)
            }
            // returns 160067.64
            return total
        })
}

const getNetWorth = async () => {
    let total = 0
    let ETHTotalInUSD = await getETHtotalAllAddrUSD()
    total = total + ETHTotalInUSD
    let tokenTotalUSD = await getTokenTotalsInUSD()
    total = total + tokenTotalUSD
    return total
}

const appendNetWorthDIV = async () => {
    let netWorth = await getNetWorth()
    netWorthDIV.innerHTML=`$${parseInt(netWorth)}`
}

const getETHtotalAllAddrUSD = () => {
    return axios
        .get(baseURL + 'api/printAddresses')
        .then(async res => {
            var val = res.data.reduce(function(acc, cv) {
                return {
                    balance: acc.balance + cv.balance
                }
            })

            let ETHprice = await returnETHprice()
            return (ETHprice * val.balance)
        })
        .catch((err) => console.log(err))
}

const returnETHprice = () => {
    return axios
        .get(baseURL+'api/ethPrice/')
        .then(res => {
            // returns 3021.11
            return res.data.price
    })
}

// calls api/tokenBals, .then calls fxns clearTokens, populateTokenBals
const getAllTokens = () => {
    axios
        .get(baseURL + 'api/tokenBals')
        .then(res => {
            // clearTokens()
            populateTokenBals(res)
        })
}

const populateTokenBals = async (res) => {
    if (res.data.length > 0) portfolioTableTokens.hidden = false
    
    tokensInList = []

    console.log(res.data)
    
    // res.data is array of tokens
    for (let i = 0; i < res.data.length; i++) {

        let ticker = res.data[i].ticker

        let tkn = document.createElement('td')
        tkn.setAttribute('class', 'column-1')
        tkn.textContent = `${res.data[i].ticker}`
        
        let bal = document.createElement('td')
        balance = 0
        for (let j = 0; j < res.data.length; j++) {
            if (ticker === res.data[j].ticker) {
                balance = balance + res.data[j].balance
            }
        }
        bal.textContent = `${balance.toFixed(2)}`
        
        let USDval = document.createElement('td')
        let USDvalue = ((balance * res.data[i].USDprice))
        USDval.textContent = `$${USDvalue.toFixed(2)}`
        console.log('res.data', res.data)
        console.log('ticker', ticker)
        console.log('i', i)
        console.log('res.data[i].balance', res.data[i].balance)
        console.log('balance', balance)
        console.log('USDvalue', USDvalue)

        let netWorth = await getNetWorth()
        let val = document.createElement('td')
        let percent = ((USDvalue / netWorth)*100).toFixed(2)
        val.textContent = `${percent}%`
        console.log('percent', percent)

        if (USDvalue > 0.5 && (!tokensInList.includes(ticker))) {
            tokensInList.push(ticker)

            let tableRow = document.createElement('tr')
            tableRow.id = `${res.data[i].ticker}`
            portfolioTableETH.appendChild(tableRow)

            tableRow.appendChild(tkn)
            tableRow.appendChild(bal)
            tableRow.appendChild(USDval)
            tableRow.appendChild(val)
        }
    }
    
    // for (let i = 0; i < res.data.length; i++) {
    //     let rowImLookingFor = document.querySelector('#' + res.data[i].ticker)
        
    //     let netWorth = await getNetWorth()
    //     let val = document.createElement('td')
    //     let USDvalue = ((res.data[i].balance * res.data[i].USDprice))
    //     let percent = ((USDvalue / netWorth)*100).toFixed(2)
    //     val.textContent = `${percent}%`
    //     if (USDvalue > 0.5) rowImLookingFor.appendChild(val)
    // }
}

displPortfolio()
getAllTokens()
ETHprice()
getNetWorth()
appendNetWorthDIV()

//testaddress: 0x413933b69b33174f246f32603CcAb9a1C95927Bd, bal = 600.0ETH