console.log('JS connected')

const addAddressBtn = document.querySelector('#newAddressBtn')
const linebreak = document.createElement("br")
const addrInput = document.querySelector('#address')
const nicknameInput = document.querySelector('#nickname')
const submitBtn = document.querySelector('#submit-btn')

function addInputBoxes() {
    addrInput.removeAttribute("hidden")
    nicknameInput.removeAttribute("hidden")
    submitBtn.removeAttribute("hidden")
    addAddressBtn.hidden = true
}

function submitHandler(evt) {
    evt.preventDefault()

    const address = document.querySelector('#address').value
    const nickname = document.querySelector('#nickname').value
    let addresses = document.createElement('div')
    address.id = "address-input"
    addresses.innerHTML = `<p>${nickname} | ${address}</p>`
    body.appendChild(addresses)
    
    addrInput.value = ''
    nicknameInput.value = ''
    
    addrInput.hidden = true
    nicknameInput.hidden = true
    submitBtn.hidden = true
    addAddressBtn.hidden = false
    
}


function getBal(e) {
        axios
            .get('/api/balances')
            .then(res)
    }
    
    addAddressBtn.addEventListener('click', addInputBoxes)
    submitBtn.addEventListener('click', submitHandler)
    
    
    
    // document.getElementsByClassName will be an array
    
    
    // } else {
    //     const p = document.createElement('p')
    //     p.innerText = "you need to enter an address before you can add more!"
    //     const body = document.querySelector('#body')
    //     body.appendChild(p)
    //     setTimeout(() => {body.removeChild(p)}, 2000)
    // }

    //testaddress: 0x413933b69b33174f246f32603CcAb9a1C95927Bd, bal = 600.0ETH