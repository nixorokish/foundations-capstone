console.log('JS connected')

const addAddressBtn = document.querySelector('#newAddressBtn')
const linebreak = document.createElement("br")

function addInputBoxes() {
    const items = document.getElementsByClassName('addrInput')
    console.log('items = ', items)
    console.log('length = ', items.length)

    if (items.length < 1) {
    
        const addrInput = document.createElement('input') // create address input
        addrInput.type = 'text'
        addrInput.placeholder = 'copy address here'
        addrInput.className = 'addrInput'

        const addressesDiv = document.querySelector('#addresses') // find addresses div

        addressesDiv.appendChild(addrInput, linebreak) // append addresses div

        const nicknameInput = document.createElement('input') // create address input
        nicknameInput.type = 'text'
        nicknameInput.placeholder = 'add a nickname'

        const nicknamesDiv = document.querySelector('#nicknames') // find nicknames div

        nicknamesDiv.appendChild(nicknameInput, linebreak)
    } else {
        const p = document.createElement('p')
        
        p.innerText = "you need to enter an address before you can add more!"
        const body = document.querySelector('#body')
        body.appendChild(p)
        
        setTimeout(() => {body.removeChild(p)}, 2000)
        
    }
}




addAddressBtn.addEventListener('click', addInputBoxes)

// document.getElementsByClassName will be an array