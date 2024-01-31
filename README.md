<!-- TITLE -->
<p align="center"> 
  
 <h2 align="center">Minicash</h2>
 <h2 align="center">Build a simple CUSD withdrawal app for Minipay</h2>
</p>

## Introduction
  <p align="center">
    
<p>In this build, we will be learning how to create a CUSD withdrawal application for Minipay.</p>
  <p align="center">
    <h2>What is Minipay?</h2>
  </p>
   MiniPay is a blockchain-based dollar wallet built on Celo and integrated right into the Opera Mini browser. With MiniPay your funds are stored in cUSD – a stable asset tied to the value of the US Dollar
</p>
  </p>
</p>

## TABLE OF CONTENTS 

- [Introduction](#introduction)

- [Tech Stack](#tech-stack)

- [Celo Composer](#celo-composer)
  
- [Bootstrap the Application](#bootstrap-the-application)

- [Build the withdraw component](#build-the-withdraw-component)

- [Building the UI](#building-the-ui)

   -  [Building the header component](#building-the-header-component)

   -  [Creating a button component](#creating-a-button-component)
 
   - [Building the home component](#building-the-home-component)

- [Testing our app](#testing-our-app)

   -  [Instructions to test the app on Minipay](#instructions-to-test-the-app-on-minipay)

- [Conclusion](#conclusion)

### Tech Stack
<p>Here’s the stack that we will be working with:
  
-   [Next.js](https://nextjs.org/) app framework
-   [TailwindCSS](https://tailwindcss.com/) for UI styling
-   [rainbowkit-celo](https://www.npmjs.com/package/@celo/rainbowkit-celo), a plugin to help rainbowkit developers support the CELO protocol faster.
-   [Typescript](https://www.typescriptlang.org/)
## Celo Composer

The easiest way to start with Celo Composer is using `@celo/celo-composer`. This CLI tool lets you quickly start building dApps on Celo for multiple frameworks, including React (with either react-celo or rainbowkit-celo), React Native (w/o Expo), Flutter, and Angular. In our case, we will work with React, specifically NextJS.
## Bootstrap the Application
Bootstrap the application using this Celo Composer command.

``` sh 
npx @celo/celo-composer create
```
1. Select the below choices as you move through each option and rename the app with a name of your choice.

![Screenshot from 2024-01-30 10-38-35](https://github.com/dancankimutai/minicash-app/assets/59916500/264a0ad5-497c-43cb-926d-884b2a7daca1)

2. Move to the project's root directory and run `yarn` or `npm install` to install the dependencies required in the project, in my case am using yarn.

![Screenshot from 2024-01-30 10-40-44](https://github.com/dancankimutai/minicash-app/assets/59916500/6ea9290d-da64-474b-8f33-5d825ea57df1)

3. Then open the app in your code editor of choice, if visual studio code type `code .` in the project’s root directory to launch vs code.
Change the directory in your terminal and run `yarn dev` to check if there is anything else we may need.

![Screenshot from 2024-01-30 11-00-55](https://github.com/dancankimutai/minicash-app/assets/59916500/821c00f5-c762-4e58-b780-70762d806b1e)

4. Visit the localhost URL displayed there in your browser to view our rendered app. We find this error.
   
![Screenshot from 2024-01-30 11-01-26](https://github.com/dancankimutai/minicash-app/assets/59916500/81d0c7a2-8c3c-40d8-a50e-03db9368696b)

5. We visit our `_app.tsx` file and find:

`*const* projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as *string*; // get one at https://cloud.walletconnect.com/app`

6. We thus visit the URL and create an account. We then create a project ID by typing the name of our app and on type select the app then click Create as shown below.

![Screenshot from 2024-01-30 10-59-10](https://github.com/dancankimutai/minicash-app/assets/59916500/7b09cae5-b63a-46ba-9a71-5911c4d45525)

7. We then copy the project ID that is generated:
   
![Screenshot from 2024-01-30 11-08-21](https://github.com/dancankimutai/minicash-app/assets/59916500/aae31475-1ad8-4497-b093-8d8b21f744c1)

8. In your `packages/react-app/` directory create a file called .env and paste your id there as below.

![Screenshot from 2024-01-30 11-10-51](https://github.com/dancankimutai/minicash-app/assets/59916500/382afa5e-de7d-47f6-a41a-af001b93b7ab)

9. When you now go back to the localhost page on your browser it should now display as below and not an error.

![Screenshot from 2024-01-30 11-11-31](https://github.com/dancankimutai/minicash-app/assets/59916500/041bb0ba-bf85-4ffb-a253-87ca11907f6a)

## Build the withdraw component
In the `packages/react-app/` create a folder called utils and in it create a file named `withdraw.ts` and paste this code.

``` sh
//utils/withdraw.ts
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

    // Transfer the amount to the external address.
    let txn = await CUSDContract.transfer(address, (ethers.utils.parseEther(amount)));
       
}};
```
Here’s an explanation of what we have done:

1. **Importing ethers Library**: we imported the **`ethers`** library, which is a JavaScript library for interacting with Ethereum and Ethereum-like blockchains.
2. **Defining CUSD Contract Address**: we then defined the address of the CUSD contract.
3. **transferCUSD Function**: This function is used to transfer CUSD tokens from the user's address to another address. It takes three parameters: **`address`** (the recipient's address), **`userAddress`** (the user's address), and **`amount`** (the amount of CUSD tokens to transfer).
4. **Checking Web3 Provider**: We then check if there is a Web3 provider available (such as MetaMask etc.).
5. **Creating Web3Provider Instance**: If a Web3 provider is available, we create a **`Web3Provider`** instance using **`window.ethereum`**.
6. **Getting Signer**: we then get the signer (user's wallet) from the provider using the **`getSigner`** function.
7. **Defining ABI**: we then define the ABI (Application Binary Interface) of the CUSD contract. The ABI describes how to interact with the smart contract.
8. **Creating Contract Instance**: we then create a contract instance (**`CUSDContract`**) using the contract address, ABI, and signer.
9. **Transferring Tokens**: Finally, we transfer the specified amount of CUSD tokens to the specified address using the **`transfer`** function of the **`CUSDContract`**.

## Building the UI

## Building the header component

In the **Header** component, we will display the app name, and connect wallet button.

``` sh
//components/Header.tsx
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function Header() {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setHideConnectBtn(true);
      connect();
    }
  }, [connect]);

  return (
    <Disclosure as="nav" className=" border-b border-black">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-black focus:outline-none focus:ring-1 focus:ring-inset focus:rounded-none focus:ring-black">
                  <span className="sr-only">Open main menuu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                
                <h1 className="sm:text-5xl text-3xl font-bold ml-2 tracking-tight">
                  Minicash
                </h1>
                
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!hideConnectBtn && (
                  <ConnectButton
                    showBalance={{ smallScreen: true, largeScreen: false }}
                  />
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pt-2 pb-4">
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-black py-2 pl-3 pr-4 text-base font-medium text-black"
              >
                Home
              </Disclosure.Button>
             
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

declare global {
  interface Window {
    ethereum: any;
  }
}
```
1. `const [hideConnectBtn, setHideConnectBtn] = useState(false);`
    
    This line declares a state variable `hideConnectBtn` and a function to update it `setHideConnectBtn`. The initial value of `hideConnectBtn` is `false`. This state is used to control the visibility of the "Connect" button in our UI.
    
2. `const { connect } = useConnect({ connector: new InjectedConnector(), });`
    
    This line uses a custom hook `useConnect` which sets up a connection to a blockchain network. The `InjectedConnector` object is used to establish this connection. The `connect` function returned by `useConnect` is used to initiate the connection.
    
3. The `useEffect` hook is used to perform side effects in function components. It takes two arguments: a function and an array of dependencies. The function will run after the render is committed to the screen.
    
    The `useEffect` hook here checks if `window.ethereum` exists and if `window.ethereum.isMiniPay` is true. If both conditions are met, it sets `hideConnectBtn` to `true` and calls the `connect` function. This means that if the webpage is opened in a MiniPay browser, the "Connect" button should be hidden and the connection to the blockchain should be established automatically. This ensures that when we open our app in the minipay test page later on it will not show the connect button in there but will automatically be connected in the background.
    
4. The dependency array for `useEffect` contains `connect`. This means the effect will re-run whenever `connect` changes. this `useEffect` will likely only run once after the initial render, and then whenever `window.ethereum` or `window.ethereum.isMiniPay` changes.

This code sets up a connection to the blockchain using the user's browser-based wallet (like MetaMask or MiniPay).

## Creating a button component
``` sh
//components/Button.tsx
type Props = {
    text: string;
    onClick: () => void;
    loading: boolean;

};

function Button({ text, onClick, loading}: Props ){
    
    return (
        <button
            type="button"
            onClick={onClick}
            className="bg-black rounded-full text-white font-medium px-9 py-3 sm:mt-10 mt-8 hover:bg-black/80 mx-auto"
        >
            {loading === true && (
                <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark: text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg" >
                    <path
                        d="M100 58.5988C180 78.2051 77.6142 100.591 50 108.591C22.3858 180.591 8 78.2051 8 50.5988C8 22"
                        fill="currentColor" 
                    />
                    <path
                        d="M93.9676 39.8489C96.393 38.4838 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.369"
                        fill="#1C64F2" 
                    />
                 </svg>
            )}
            {loading === true ? "Sending..." : text}         
                  

        </button>
    );}
    export default Button;
```
This creates a reusable button with a conditional rendering based on the **`loading`** prop

- if **`loading`** is **`true`**, it displays a loading spinner (**`<svg>`** element) followed by the text "Sending...".
- If **`loading`** is **`false`**, it displays the **`text`** prop passed to the button.

## Building the home component
``` sh
//pages/index.tsx
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
      setTransactionStatus("complete"); // Mark transaction as complete
      toast.success("Withdrawal successful!"); // Show a success message
    } catch (error) {
      toast.error("Withdrawal failed. Please try again."); // Show an error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-cot justify-center items-center w-full">
      <div className="-full flex flex-col justify-center items-start px-7">
        <p className="mx-auto max-w-xl text-lg text-slate-700 leading-8 font-semibold">
          Withdraw CUSD tokens from Minipay to your CUSD-compatible wallet address for free.
        </p>
        {/* text input field to get the withdrawal address from the user. */}
        <input
          type="text"
          placeholder="  Enter Withdrawal address"
          value={externalAddress}
          onChange={(e) => setExternalAddress(e.target.value)}
          className="border -b border-black mt-5 mb-8 rounded-lg w-full h-11 text-center"
        />
        {/*text input field to get the amount from the user. */}
        <input
          type="number"
          placeholder="  Enter Amount e.g 1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border -b border-black mb-2 rounded-lg w-full h-11 text-center"
        />
        <Button
          loading={loading}
          text={transactionStatus === "complete" ? "Withdraw CUSD" : "Withdraw CUSD"}        
          onClick={handleWithdraw}
        />
        {transactionStatus === "complete" && (
          <div className="mx-auto max-w-xl text-lg text-green-700 leading-8 font-semibold">Withdrawal complete!</div>
        )}

      </div>
    </div>

  );
}
```
Let's break down the code:

1. Several modules are imported at the beginning, including React hooks, a hook `useAccount` from `wagmi`, the`Button` component we had created, the `transferCUSD` function, and a `toast` function from `react-toastify` for displaying notifications.
2. The `Home` function component is declared. Inside this component, we declare several state variables using `useState`:
    - `userAddress` and `setUserAddress` to store the user's blockchain address.
    - `loading` and `setLoading` to indicate whether a withdrawal operation is in progress.
    - `externalAddress` and `setExternalAddress` to store the address to which the user wants to withdraw tokens.
    - `amount` and `setAmount` to store the amount the user wants to withdraw.
    - `transactionStatus` and `setTransactionStatus` to track the status of the withdrawal transaction.
3. The `useAccount` hook is called, which retrieves the user's blockchain account information.
4. A `useEffect` hook is used to update `userAddress` whenever `address` or `isConnected` changes. If the user is connected and an address is available, `userAddress` is set to `address`.
5. The `handleWithdraw` function is declared. This function sets `loading` to `true`, calls `transferCUSD` to perform the withdrawal, updates `transactionStatus` to `"complete"` if the operation is successful, and displays a success message using `toast.success`. If an error occurs, an error message is displayed using `toast.error`. Regardless of the outcome, `loading` is set to `false` at the end. This ensures that when the withdrawal is occurring the button will display a spinning animation and display sending and when it's complete it returns to normal and allows the user to withdraw again.
6. We then create the input fields for the address and amount.

In summary, the code sets up a connection to the Celo blockchain using the user's minipay wallet, allows the user to input withdrawal details, and performs the withdrawal operation when the user clicks the button.

If you get an error that react-toastify isn’t installed you can install it by running 
``` sh
yarn add react-toastify
```
Ou localhost page should now look like this on our browser:

![Screenshot from 2024-01-30 12-48-32](https://github.com/dancankimutai/minicash-app/assets/59916500/d3ab0ae1-9255-4081-bba2-1770d2e9e206)

## Testing our app

To test our app we must put it online by creating a forwarding URL, you can use a free tool like ngrok. It'sInstructions can be found here:
[https://ngrok.com/docs/getting-started/](https://ngrok.com/docs/getting-started/)

Personally am using gitpod which is an online dev environment. When I run yarn dev it prompts me to either leave the service on the port private or make it public so that I can access it over another device via a URL and I do so.

![Screenshot from 2024-01-30 12-51-21](https://github.com/dancankimutai/minicash-app/assets/59916500/e1c25420-ff74-473a-8bc2-6f306e40514a)

We copy the URL address provided for use later.

### Instructions to test the app on Minipay

1. Install Opera mini Browser from the app store.

2. Open it and at the bottom click on the opera logo and click MiniPay in the menu that appears.

3. If you don't have an account create one and load CUSD tokens to your Minipay using the various options provided in MiniPay.You can even deposit from valora or another crypto wallet. If having challenges finding the add cash button, at the page below swipe down from the part of your screen below your balance to find it.

![image](https://github.com/dancankimutai/minicash-app/assets/59916500/0dfecbd3-0e13-406d-bfcd-240db15f3222)

![image](https://github.com/dancankimutai/minicash-app/assets/59916500/39ccd211-e3bb-4138-aff9-0ad7d2bdc19c)

4. After depositing, click the compass Icon just below your balance on the minipay homepage scroll down to the Discover page that opens, and select Site Tester.

5. Paste the project URL/address we copied earlier and click Go. For this tutorial, you can use the link in this tutorial description or this

[https://minicash-app-react-app.vercel.app/](https://minicash-app-react-app.vercel.app/)

![image](https://github.com/dancankimutai/minicash-app/assets/59916500/d0e706d3-1030-46e6-8ecf-45948448e0a8)

6. Minicash application launches and showcases two input boxes. for entering the withdrawal/recipient address and amount to be withdrawn.

![image](https://github.com/dancankimutai/minicash-app/assets/59916500/d9f69ca1-4d1e-4677-8343-18e3f4b2d437)

7. Enter your CUSD-compatible address and the amount you want to withdraw from Minipay and click Withdraw CUSD.

![image](https://github.com/dancankimutai/minicash-app/assets/59916500/85152c37-730e-4fd2-ba80-ff7c44726c3d)

8. A pop-up shows to authorize it using your fingerprint and after okaying the transaction starts processing.

![image](https://github.com/dancankimutai/minicash-app/assets/59916500/876f9bfa-932e-4308-a8f4-3e5928603dda)

9. After sending it will display Withdrawal complete at which point you can even go and confirm in your wallet that the tokens have been received.

![image](https://github.com/dancankimutai/minicash-app/assets/59916500/20608c4f-0690-4477-9065-01dfa28ca10e)

![image](https://github.com/dancankimutai/minicash-app/assets/59916500/6be2f8a4-d9a8-4930-a701-5ef6ea2dc2b1)

## Conclusion

Congratulations! You have learned how to build an app that withdraws CUSD tokens from a Minipay wallet.

Now you have the skills and knowledge needed to build a functional Minipay withdrawal application on your own and test that it works.

<p align="right">(<a href="#top">back to top</a>)</p>
