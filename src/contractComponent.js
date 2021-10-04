import useEthBalance from "./GetBalance";
import useTransaction from "./GetData";
import { ethers } from "ethers";
import { useState } from "react";

export default function Contract() {
  const [contractCode, setContractCode] = useState();

  const contract = "0xB0F974464eA9BbB2adA6a08B0AB226Cbc57F7261";

  async function lookupContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var a = await provider.getCode(contractCode);
    setContractCode(a);
  }

  return (
    <div className="ContractAddress">
      <button onClick={lookupContract}>Fetch Contract</button>
      <input
        onChangeCapture={(e) => setContractCode(e.target.value)}
        placeholder="Enter Contract Address"
      />

      <div classNAme="ContractBox">
        <p>Code in contract: {contractCode}</p>
      </div>
    </div>
  );
}
