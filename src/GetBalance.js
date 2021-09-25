import { useEffect, useState } from "react";
// Other imports...
import { ethers } from "ethers";

export default function useEthBalance() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    provider
      .getSigner()
      .getAddress()
      .then((addr) => {
        console.log(addr);
        return provider.getBalance(addr);
      })
      .then((rawBalance) => {
        const value = parseFloat(ethers.utils.formatEther(rawBalance));
        console.log(value);
        setBalance(value);
      });
  });
  return balance;
}
