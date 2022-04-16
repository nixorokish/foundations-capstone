console.log('JS connected')

baseURL = `http://localhost:4005/`

const addAddressBtn = document.querySelector('#newAddressBtn')
const addrInput = document.querySelector('#address')
const nicknameInput = document.querySelector('#nickname')
const submitBtn = document.querySelector('#submit-btn')
const addrListDiv = document.querySelector('#addressListDiv')
const tokenSubmit = document.querySelector('#add-token-submit')
const tokenInput = document.querySelector('#token-input')
const tokenList = document.querySelector('#token-list-ul')

function addInputBoxes() {
    addrInput.removeAttribute("hidden")
    nicknameInput.removeAttribute("hidden")
    submitBtn.removeAttribute("hidden")
    addAddressBtn.hidden = true
}

function addedAnAddress(evt) {
    evt.preventDefault()

    const address = document.querySelector('#address').value
    const nickname = document.querySelector('#nickname').value
    
    axios
        .post(baseURL + 'api/balances', { address, nickname })
        .then(res => {
            clearAddresses()
            populateAddresses(res)
        })
     

    addrInput.value = ''
    nicknameInput.value = ''
    
    addrInput.hidden = true
    nicknameInput.hidden = true
    submitBtn.hidden = true
    addAddressBtn.hidden = false
}

function addedToken(evt) {

    let tokenTicker = document.createElement('li')
    ticker = tokenInput.value
    tokenTicker.textContent = ticker
    tokenList.appendChild(tokenTicker)

    axios
    .post(baseURL + 'api/tokenBal', { ticker })
    .then(res => getAllTokens())
}

const printAllAddresses = () =>
    axios
        .get(baseURL + 'api/printAddresses')
        .then(res => {
            clearAddresses()
            populateAddresses(res)
        })

const clearAddresses = () => {
    addrListDiv.innerHTML = `<tr>
                                <th>nickname</th>
                                <th>address</th>
                                <!-- <th>shared?</th> -->
                                </tr>`
    addrListDiv.hidden = true
}

const populateAddresses = (res) => {
    if (res.data.length > 0) addrListDiv.hidden = false
    for (let i = 0; i < res.data.length; i++) {
        
        let tablerow = document.createElement('tr')
        tablerow.id = `row-${i}`
        addrListDiv.appendChild(tablerow)
        
        let tableItem1 = document.createElement('td')
        tableItem1.textContent = `${res.data[i].nickname}`
        tablerow.appendChild(tableItem1)

        let tableItem2 = document.createElement('td')
        tableItem2.textContent = `${res.data[i].address}`
        tablerow.appendChild(tableItem2)

        // var makeCheckbox = document.createElement('input')
        // makeCheckbox.type = 'checkbox'
        
        // let tableItem3 = document.createElement('td')
        // tableItem3.appendChild(makeCheckbox)
        // makeCheckbox.id = `${res.data[i].nickname}-box`
        // tablerow.appendChild(tableItem3)
    }
}

const getAllTokens = () => {
    axios
        .get(baseURL + 'api/printTokens')
        .then(res => {
            clearTokens()
            populateTokens(res)
        })
}

const clearTokens = () => {
    tokenList.innerHTML = ``
    // tokenList.hidden = true
}

const populateTokens = (res) => {
    if (res.data.length > 0) tokenList.hidden = false
    for (let i = 0; i < res.data.length; i++) {
        let listItem = document.createElement('li')
        listItem.id = `${res.data[i]}-item`
        listItem.textContent = `${res.data[i]}`
        tokenList.appendChild(listItem)
    }
}

printAllAddresses()
getAllTokens()

addAddressBtn.addEventListener('click', addInputBoxes)
submitBtn.addEventListener('click', addedAnAddress)
tokenSubmit.addEventListener('click', addedToken)

//testaddress: 
// 0x413933b69b33174f246f32603CcAb9a1C95927Bd, bal = 600.0ETH

// anothertest, sassal.eth
// 0x648aa14e4424e0825a5ce739c8c68610e143fb79