import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Button from "@/components/Button";
import { transferCUSD } from "@/utils/withdraw";
import { toast } from 'react-toastify';

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const [externalAddress, setExternalAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("initial");

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  const handleWithdraw = async () => {
    setLoading(true);

    try {
      await transferCUSD(externalAddress, address as string, amount);
      setTransactionStatus("complete");
      toast.success("Withdrawal successful!");
    } catch (error) {
      toast.error("Withdrawal failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-start px-7 max-w-xl text-lg text-slate-700 leading-8 font-semibold">
        <p>
          Withdraw CUSD tokens from Minipay to your CUSD compatible wallet address for free.
        </p>

        {/* Text input field to get the withdrawal address from the user. */}
        <input
          type="text"
          placeholder="Enter Withdrawal address"
          value={externalAddress}
          onChange={(e) => setExternalAddress(e.target.value)}
          className="border-b border-black mt-5 mb-8 rounded-lg w-full h-11 text-center"
        />

        {/* Text input field to get the amount from the user. */}
        <input
          type="number"
          placeholder="Enter Amount e.g 1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border-b border-black mb-2 rounded-lg w-full h-11 text-center"
        />

        <Button
          loading={loading}
          text={transactionStatus === "complete" ? "Withdraw CUSD" : "Withdraw CUSD"}
          onClick={handleWithdraw}
        />

        {transactionStatus === "complete" && (
          <div className="mx-auto text-lg text-green-700 leading-8 font-semibold">
            Withdrawal complete!
          </div>
        )}
      </div>
    </div>
  );
}
