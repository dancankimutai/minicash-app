import { ethers} from "ethers";
const CUSD_ADDRESS = "0x765de816845861e75a25fca122bb6898b8b1282a";///cusd contract address

export const transferCUSD = async (address: string, userAddress: string ,amount: string) => {
     if (window.ethereum) {
//Get connected accounts, if not connected request connection. 
        const provider = new ethers.providers.Web3Provider(window.ethereum); 
        const signer = await provider.getSigner(userAddress);
        
// The current selected account out of the connected accounts.
        let abi =["function transfer(address to, uint256 value)"]; 
        const CUSDContract = new ethers.Contract (CUSD_ADDRESS, abi, signer);

    // Transfer the  amount to the external address.
    let txn = await CUSDContract.transfer(address, (ethers.utils.parseEther(amount)));
       
}};