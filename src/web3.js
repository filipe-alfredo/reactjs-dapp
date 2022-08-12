import Web3 from 'web3'

const getAccount = () => {
    // Verificar se o metamask esta instalado
    if (window.ethereum && window.ethereum.isMetaMask) {

        // Solicitar carteira selecionada
        return window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(result => {
                const wallet = result[0]
                window.web3 = new Web3(window.ethereum)
                return wallet
            })
            .catch(error => {
                console.log(error.message);
            })
    } else {
        console.log("Metamask nao encontrado")
    }
}

const Contract = (abi, address) => {
    return new window.web3.eth.Contract(abi, address)
}

const web3 = { getAccount, Contract }

export default web3