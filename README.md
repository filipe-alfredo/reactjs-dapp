# Desenvolvendo uma Aplicação Descentralizada (dapp) com ReactJS

## Simulando um Blockchain RPC node

#### Instale o ganache-cli
```console
npm install -g ganache-cli
```

#### Inicie o ganache RPC de testes
```console
ganache-cli
```

---

## Criando um front-end com ReactJS

#### Crie uma aplicação ReactJS
```console
npx create-react-app reactjs-dapp
```

#### Instale as dependências necessárias
```console
cd reactjs-dapp
npm install
npm remove react-scripts && npm i react-scripts@4.0.3
npm install web3
```

---

## Criando um ambiente de desenvolvimento de Smart Contracts

#### Instale o truffle suite
```console
npm install -g truffle
```

#### Inicie um projeto truffle
```console
truffle init truffle
```

#### Instale as dependências necessárias
```console
cd truffle
npm install
npm install web3-utils
npm install @openzeppelin/contracts
```

---

## Comandos úteis

#### Compile e realize o deploy dos Smart Contracts

##### Dentro da pasta truffle execute o comando abaixo:
```console
truffle migrate --reset --compile-all
```

#### Inicie a aplicação ReactJS

##### Dentro da pasta reactjs-dapp execute o comando abaixo:
```console
npm start
```

---