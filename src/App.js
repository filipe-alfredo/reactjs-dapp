import { useState } from 'react'
import web3 from './web3'
import { abi } from './truffle/build/contracts/HelloWorld.json'
import './App.css'

function App() {

  const contractAddress = '';

  // Variáveis de estado do componente
  const [defaultAccount, setDefaultAccount] = useState('');
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState('');

  // Criar o objeto web3 com o provider metamask e guarda a wallet
  const connect = async () => {
    setDefaultAccount(await web3.getAccount())
  }

  // Executa o metodo hello do contrato
  const hello = async () => {
    try {
      let contract = web3.Contract(abi, contractAddress)
      setMessage(await contract.methods.hello().call())
    } catch(err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  // Executa o metodo whatIsYourName do contrato
  const whatIsYourName = async () => {
    try {
      var contract = web3.Contract(abi, contractAddress)
      contract.methods.whatIsYourName(newName)
        .send({
          from: defaultAccount
      }).then(receipt => {
        console.log(receipt)
      })
    } catch(err) {
      console.log(err)
      setMessage(err.message)
    }
  }
  
  // Renderização do template HTML
  return (
    <div>
      <h2> My first daap </h2>
      <h5>
        <button className="btn" onClick={connect}>conectar</button> 
        &nbsp;&nbsp;&nbsp;Wallet: {defaultAccount}
      </h5>
      <label>Contract Address: {contractAddress}</label><br />
      <button className="btn" onClick={hello}>Hello</button>
      <br /><br />
      <label>New Name:</label><br />
      <input type="text" className="input" value={newName} onChange={evt => setNewName(evt.target.value)} />&nbsp;&nbsp;
      <button className="btn" onClick={whatIsYourName}>Enviar</button>
      <br /><br />
      <fieldset className="message">{message}</fieldset>
    </div>
  );
}

export default App;
