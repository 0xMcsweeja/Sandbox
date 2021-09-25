import { useEffect, useState } from "react";
// Other imports...
import { ethers } from "ethers";

export default function useTransaction() {
  const [txn, setBalance] = useState(0);

  var arrOfDAta = [];
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    provider
      .getSigner()
      .getAddress()
      .then((addr) => {
        console.log(provider.getTransactionCount(addr));
        return provider.getTransactionCount(addr);
      })
      .then((rawTxn) => {

        setBalance(rawTxn);
        
      });
  });
  return txn;
}
