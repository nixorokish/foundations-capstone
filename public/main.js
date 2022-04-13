console.log('JS connected')

baseURL = `http://localhost:4005/api/balances`

const addAddressBtn = document.querySelector('#newAddressBtn')
const linebreak = document.createElement("br")
const addrInput = document.querySelector('#address')
const nicknameInput = document.querySelector('#nickname')
const submitBtn = document.querySelector('#submit-btn')
const addrListDiv = document.querySelector('#addressListDiv')
const addressList = document.querySelector('#addressList')

const addressesCallback = ({ data: addresses }) => displayAddresses(addresses)

function displayAddresses(arr) {
    addrListDiv.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        addrListDiv.innerHTML = `<p>${addresses.nickname}, ${addresses.address}</p>`
    }
}

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
    
    axios
        .post(baseURL, { address, nickname })
        .then(res => {
            for (let i = 0; i < res.data.length; i++) {
                let x = document.createElement('li') 
                x.textContent = `${res.data[i].nickname} | ${res.data[i].address} | bal: ${res.data[i].balance}`
                console.log(x)
                addressList.appendChild(x)
            }
        })
     
    // let addresses = document.createElement('div')
    // address.id = "address-input"
    // addresses.innerHTML = `<p>${nickname} | ${address}</p>`
    // body.appendChild(addresses)

    addrInput.value = ''
    nicknameInput.value = ''
    
    addrInput.hidden = true
    nicknameInput.hidden = true
    submitBtn.hidden = true
    addAddressBtn.hidden = false
    
}



addAddressBtn.addEventListener('click', addInputBoxes)
submitBtn.addEventListener('click', submitHandler)







// function getBal(e) {
//         let body = {
//             globalID,
//             nickname: nickname.value,
//             address: address.value,
//         }
        
//         axios
//             .get('/api/balances')
//             .then(res)
//     }
    
// document.getElementsByClassName will be an array


// } else {
//     const p = document.createElement('p')
//     p.innerText = "you need to enter an address before you can add more!"
//     const body = document.querySelector('#body')
//     body.appendChild(p)
//     setTimeout(() => {body.removeChild(p)}, 2000)
// }

//testaddress: 0x413933b69b33174f246f32603CcAb9a1C95927Bd, bal = 600.0ETH