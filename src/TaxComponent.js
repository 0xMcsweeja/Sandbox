import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Tax from "./artifacts/contracts/Tax.sol/TaxTenPercent.json";

export default function TaxComponent() {
  const [eth, setEth] = useState();
  const taxAddress = "0xb2D88bba91652Ad7CcD0DbCff3250531582361a1";

  async function TaxContract() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(taxAddress, Tax.abi, signer);
      const value2 = ethers.BigNumber.from("1000000000000000000");
      var options = { value: value2, gasLimit: 8000000 };
      const transaction = await contract.fallback(options);

      await transaction.wait();
    }
  }

  return (
    <div className="AccountBox">
      <p>
        This contract forwards 90% of the transaction to a burn wallet and
        witholds 10%{" "}
      </p>
      <button onClick={TaxContract}>Connect</button>
      <input
        onChange={(e) => setEth(e.target.value)}
        placeholder="Amount (wei)"
      />
    </div>
  );
}
