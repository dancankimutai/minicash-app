import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Button from "@/components/Button";
import { transferCUSD } from "@/utils/withdraw";
import { toast } from 'react-toastify';

const MAX_WITHDRAWAL_AMOUNT = 1000000; // Adjust as needed

const isValidCUSDAddress = (address) => {
  // Implement CUSD address validation logic
  // Example: return address.startsWith("CUS");
};

const isValidAmount = (amount) => {
  return amount > 0 && amount <= MAX_WITHDRAWAL_AMOUNT;
};

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
      // Sanitize user input
      const sanitizedExternalAddress = externalAddress.trim();

      // Input validation
      if (!isValidCUSDAddress(sanitizedExternalAddress)) {
        toast.error("Invalid CUSD address");
        return;
      }

      if (!isValidAmount(Number(amount))) {
        toast.error("Invalid withdrawal amount");
        return;
      }

      // Token transfer logic
      const transactionId = await transferCUSD(sanitizedExternalAddress, address, Number(amount));
      
      setTransactionStatus("complete");
      toast.success(`Withdrawal successful! Transaction ID: ${transactionId}`);
      
      // Clear input fields after success
      setExternalAddress("");
      setAmount("");
    } catch (error) {
      // Provide more specific error messages
      toast.error("Withdrawal failed: " + error.message);
      // Consider retry logic or user guidance here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-start px-7">
        <p className="mx-auto max-w-xl text-lg text-slate-700 leading-8 font-semibold">
          Withdraw CUSD tokens from Minipay to your CUSD compatible wallet address for free. 
        </p>
        <label htmlFor="withdrawalAddress">Withdrawal Address</label>
        <input
          type="text"
          id="withdrawalAddress"
          placeholder="Enter withdrawal address"
          value={externalAddress}
          onChange={(e) => setExternalAddress(e.target.value)}
          className="border-b border-black mt-2 rounded-lg w-full h-11 text-center"
        />
        <label htmlFor="withdrawalAmount">Withdrawal Amount</label>
        <input
          type="number"
          id="withdrawalAmount"
          placeholder="Enter amount (e.g., 1)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border-b border-black mt-2 mb-2 rounded-lg w-full h-11 text-center"
        />
        <Button
          loading={loading}
          text={transactionStatus === "complete" ? "Withdrawn" : "Withdraw CUSD"}
          onClick={handleWithdraw}
          disabled={loading}
        />
        {transactionStatus === "complete" && (
          <div className="mx-auto max-w-xl text-lg text-green-700 leading-8 font-semibold">
            Withdrawal complete!
          </div>
        )}
      </div>
    </div>
  );
}
