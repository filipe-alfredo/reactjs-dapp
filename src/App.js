import { useState, useEffect } from 'react'
import Web3 from 'web3'
import ERC20ABI from './ERC20.json'

function App() {

  // Variáveis de estado do componente
  const [defaultAccount, setDefaultAccount] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenSupply, setTokenSupply] = useState('');
  const [tokenBalance, setTokenBalance] = useState('');
  const [tokenTo, setTokenTo] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');

  // Criar o objeto web3 com o provider metamask
  const loadMetamask = () => {

    // Verificar se o metamask esta instalado
    if (window.ethereum && window.ethereum.isMetaMask) {

      // Solicitar carteira selecionada
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          const wallet = result[0]

          // Guardar o endereço da carteira
          setDefaultAccount(wallet)
          window.web3 = new Web3(window.ethereum)
        })
        .catch(error => {
          console.log(error.message);
        })
    } else {
      console.log("Metamask nao encontrado")
    }
  }

  // Disparos reativos
  useEffect(() => {

    // Verifica se o Metamask esta instalado
    if (window.ethereum && window.ethereum.isMetaMask) {

      // Carrega os dados quando a rede for alterada
      window.ethereum.on('chainChanged', async () => {
        await loadMetamask()
      })

      // Carrega os dados quando a conta/carteira for alterada
      window.ethereum.on('accountsChanged', async () => {
        await loadMetamask()
      })

      // Carrega os dados do token
      if(tokenAddress !== '') {
        tokenAddressChange({ target: { value: tokenAddress } })
      }
    }
  })

  // Carrega os dados do token ERC20 através do endereço
  const tokenAddressChange = async (evt) => {
    try {

      // Guarda todos os dados do token nas variáveis
      const address = evt.target.value
      let tokenContract = new window.web3.eth.Contract(ERC20ABI, address)
      setTokenName(await tokenContract.methods.name().call())
      setTokenSymbol(await tokenContract.methods.symbol().call())
      setTokenSupply(window.web3.utils.fromWei(await tokenContract.methods.totalSupply().call()))
      setTokenBalance(window.web3.utils.fromWei(await tokenContract.methods.balanceOf(defaultAccount).call()))
      setTokenAddress(address)

    } catch (err) {

      // Limpa todos os dados do token nas variáveis
      setTokenName(null)
      setTokenSymbol(null)
      setTokenSupply(null)
      setTokenBalance(null)
      console.log(evt, err.message)
    }
  }

  // Guarda valor da carteira destino
  const tokenToChange = async (evt) => {
    setTokenTo(evt.target.value)
  }

  // Guarda valor a ser transferido para a carteira destino
  const tokenAmountChange = async (evt) => {
    setTokenAmount(evt.target.value)
  }

  // Envia tokens ERC20 para outra carteira
  const send = async () => {

    // Cria instancia do contrato
    var tokenContract = new window.web3.eth.Contract(ERC20ABI, tokenAddress)

    // Executa o metodo de transferencia
    tokenContract.methods.transfer(tokenTo, window.web3.utils.toWei(tokenAmount))
      .send({
        from: defaultAccount
    }).then(receipt => {
      console.log(receipt)

      // Atualiza o saldo
      tokenContract.methods.balanceOf(defaultAccount).call().then(result => {
        setTokenBalance(window.web3.utils.fromWei(result))
      })
    })
  }
  
  // Renderização do template HTML
  return (
    <div>
      <h2> My First Application </h2>
      <button className="btn" onClick={loadMetamask}>conectar</button>
      <br />
      <h4>Wallet: {defaultAccount}</h4>
      <br />
      <div>
        <label>Contract Address:</label>
        <input type="text" value={tokenAddress || ''} onChange={evt => tokenAddressChange(evt)} />
        <br />
        Name: {tokenName} ({tokenSymbol})
        <br />
        Supply: {tokenSupply}
        <br />
        Balance: {tokenBalance}
      </div>
      <br />
      <label>To:</label>
      <input type="text" value={tokenTo || ''} onChange={evt => tokenToChange(evt)} />
      <br />
      <label>Amount:</label>
      <input type="number" value={tokenAmount || ''} onChange={evt => tokenAmountChange(evt)} />
      <br />
      <button onClick={send}>Enviar</button>
      <br /><br />
    </div>
  );
}

export default App;
