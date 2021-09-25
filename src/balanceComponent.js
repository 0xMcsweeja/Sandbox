import useEthBalance from "./GetBalance";
import GetBalance from "./GetBalance";

export default function Balance() {
  const balance = useEthBalance();
  return (
    <div className="apsp">
      <p className="caption">Your balance is</p>
      <p className="balance">{balance} ETH</p>
    </div>
  );
}
