
import { BrowserProvider, Contract, parseEther } from "ethers";
const CUSD_ADDRESS = "0x765de816845861e75a25fca122bb6898b8b1282a";///cusd contract address

export const transferCUSD = async (address: string, userAddress: string ,amount: string) => {
     if (window.ethereum) {
//Get connected accounts, if not connected request connection. 
        const provider = new BrowserProvider(window.ethereum); 
        const signer = await provider.getSigner(userAddress);
        
// The current selected account out of the connected accounts.
        let abi =["function transfer(address to, uint256 value)"]; 
        const CUSDContract = new Contract (CUSD_ADDRESS, abi, signer);
        // Convert the amount to CUSD units (wei)
        const parsedAmount = parseEther(amount);

    // Transfer the amount to your address.
        const transaction = await CUSDContract.transfer(address, parsedAmount);
        let Receipt = await transaction.wait();

}};