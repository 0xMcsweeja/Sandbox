import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Contract from "./contractComponent";

// Update with the contract address logged out to the CLI when it was deployed
const greeterAddress = "0xB0F974464eA9BbB2adA6a08B0AB226Cbc57F7261";

function App() {
  // store greeting in local state
  const [network, setNetwork] = useState();
  const [balance, setBalance] = useState();
  const [transactions, setTransactions] = useState();
  const [code, setCode] = useState();
  const [account, setAccount] = useState();
  const [storage, setStorage] = useState();

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function connectWallet() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      var address = await provider.getSigner().getAddress();
      var network = (await provider.getNetwork()).name;
      var rawBalance = await provider.getSigner().getBalance();
      var balance = parseFloat(ethers.utils.formatEther(rawBalance));
      var txns = await provider.getTransactionCount(address);
      var code = await provider.getCode(address);
      var account = await provider.listAccounts();
      var rawstorage = await provider.getStorageAt(address, 0);
      console.log(rawstorage);
      var storage = ethers.utils.arrayify(rawstorage);
      //console.log(block);
      setNetwork(network);

      setAccount(account);
      setBalance(balance);
      setTransactions(txns);
      setCode(code);
      setStorage(storage);
    }
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  // call the smart contract, send an update
  // async function setGreeting() {
  //   if (!greeting) return;
  //   if (typeof window.ethereum !== "undefined") {
  //     await requestAccount();
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
  //     const transaction = await contract.setGreeting(greeting);
  //     await transaction.wait();
  //     fetchGreeting();
  //   }
  // }

  return (
    <div className="App">
      <header className="App-header">Ethereum Development Sandbox</header>
      <div className="boundingBox">
        <button onClick={connectWallet}>Connect Wallet</button>
        <p className="networkname">network: {network}</p>
        <div className="AccountAddress">
          <div className="AccountBox">
            <p>Account: {account}</p>
            <p>Balance: {balance} Ether</p>
            <p>Transactions: {transactions} </p>
            <p>Code: {code} </p>
            <p>Storage: {storage} </p>
          </div>
        </div>
        <Contract></Contract>
      </div>
    </div>
  );
}

export default App;

{
  /* <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button> */
}
{
  /* <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
        /> */
}

{
  /* <Balance></Balance>
        <Network></Network> */
}
