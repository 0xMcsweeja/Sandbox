import useEthBalance from "./GetBalance";
import useTransaction from "./GetData";

export default function Balance() {
  const balance = useEthBalance();
  const transaction = useTransaction();

  return (
    <div className="apsp">
      <p className="caption">Your balance is</p>
      <p className="balance">Balance {balance} ETH</p>
      <p className="Transaction">Transaction count: {transaction} </p>
    </div>
  );
}
