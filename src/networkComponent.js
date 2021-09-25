import { useState } from "react";
import { ethers } from "ethers";


export default function Network() {
    const [network, setNetwork] = useState();

    function getNetwork() {
        if (typeof window.ethereum !== "undefined") {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          provider.getNetwork().then(x => setNetwork(x));

          
        }
      }

  return (
    <div className="aspsp">
      <p className="caption">{getNetwork()}</p>

    </div>
  );
}
