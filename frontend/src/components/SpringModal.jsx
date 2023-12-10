import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { GoArrowSwitch } from "react-icons/go";
import { useState } from "react";
// import { JsonRpcProvider } from "ethers";
import { ethers } from "ethers";
import { parseUnits } from "viem";

import { getContract, createPublicClient, http } from "viem";
import { createBundlerClient, createSmartAccountClient } from "permissionless";
import {
  createPimlicoBundlerClient,
  createPimlicoPaymasterClient,
} from "permissionless/clients/pimlico";

import { FiAlertCircle } from "react-icons/fi";
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import {
  privateKeyToSafeSmartAccount,
  signerToSafeSmartAccount,
} from "permissionless/accounts";
import Loader from "./Loader";
import SlideInNotifications from "./Notification";
let publicClient;
let bundlerClient;

const SpringModal = ({ isOpen, setIsOpen }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokene, settokene] = useState(
    "0x7a72403B54e166Dc8b5494dB49D832d160b70761"
  );
  const [tokeno, settokeno] = useState(
    "0x0716A45a3F61139C0e3E646511307dbf137C7C7f"
  );
  const [value, setvalue] = useState("20");

  const [safeacc, setsafeacc] = useState("");

  const func = async () => {
    // const [tokene, settokene] = useState("0x7a72403B54e166Dc8b5494dB49D832d160b70761")
    // const [tokeno, settokeno] = useState("0x0716A45a3F61139C0e3E646511307dbf137C7C7f")
    const rpcUrl =
      "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    // const provider = new JsonRpcProvider(rpcUrl);

    async function main() {
      // Your code here
      publicClient = createPublicClient({
        transport: http(rpcUrl),
      });

      const paymasterClient = createPimlicoPaymasterClient({
        transport: http(
          "https://api.pimlico.io/v2/goerli/rpc?apikey=f9dae1b5-1aea-471d-a6c1-18c0f20398b0"
        ),
      });
      // You may need to replace 'some-library' with the actual library you are using for createPublicClient, createPimlicoPaymasterClient, and http.

      // const safeAccount = await privateKeyToSafeSmartAccount(publicClient, {
      //   privateKey: "0x4337433743374337433743374337433743374337433743374337433743374337",
      //   safeVersion: "1.4.1",
      //   entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // global entrypoint
      //   saltNonce: 0n, // optional
      //   addModuleLibAddress: "0x191EFDC03615B575922289DC339F4c70aC5C30Af",
      //   safe4337ModuleAddress: "0x39E54Bb2b3Aa444b4B39DEe15De3b7809c36Fc38",
      //   safeProxyFactoryAddress: "0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67",
      //   safeSingletonAddress: "0x41675C099F32341bf84BFc5382aF534df5C7461a",
      //   multiSendAddress: "0x38869bf66a61cF6bDB996A6aE40D5853Fd43B526",
      //   multiSendCallOnlyAddress: "0x9641d764fc13c8B624c04430C7356C1C7C8102e2",
      //   safeModules: ["0x"],
      //   setupTransactions: [
      //     {
      //       to: "0x",
      //       data: "0x",
      //     },
      //   ],
      // });

      // console.log(safeAccount);
      bundlerClient = createPimlicoBundlerClient({
        transport: http(
          "https://api.pimlico.io/v1/goerli/rpc?apikey=f9dae1b5-1aea-471d-a6c1-18c0f20398b0"
        ),
      });

      const gasPrices = await bundlerClient.getUserOperationGasPrice();

      console.log("creating account client GasPrices", gasPrices);

      //   const safeAccount = await privateKeyToSafeSmartAccount(publicClient, {
      //     privateKey:
      //       "0x4337433743374337433743374337433743374337433743374337433743374337",
      //     safeVersion: "1.4.1",
      //     entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // global entrypoint
      //     saltNonce: 0n, // optional
      //   });
      //   const privateKey =
      //     "0x4337433743374337433743374337433743374337433743374337433743374337";
      //   const signer = new ethers.Wallet(privateKey, provider);

      //   console.log("creating safe account with", signer);
      //   const safeAccount = await privateKeyToSafeSmartAccount(publicClient, {
      //     privateKey:
      //       "0x4337433743374337433743374337433743374337433743374337433743374337",
      //     safeVersion: "1.4.1",
      //     entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789", // global entrypoint
      //     saltNonce: 0n, // optional
      //   });

      // const provider = new ethers.BrowserProvider(window.ethereum);
      // Signers are authenticated providers connected to the current address in MetaMask.
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log(provider);
      const signer = await provider.getSigner();
      console.log(signer);

      const customSigner = {
        address: await signer.getAddress(),
        publicKey: "0x..",
        source: "custom",
        type: "local",
        signMessage: async ({ message }) => {
          return message;
        },
        signTypedData: async (typeData) => {
          try {
            return signer.signTypedData(
              typeData.domain,
              {
                [typeData.primaryType]: typeData.types[typeData.primaryType],
              },
              typeData.message
            );
          } catch (error) {
            console.error("Error signing typed data:", error);
            throw error; // Rethrow the error to propagate it further if needed
          }
        },
      };

      console.log(customSigner);

      // const customSigner = {
      //     address: await signer.getAddress(),
      //     publicKey: "0x..",
      //     source: "custom",
      //     type: 'local',
      //     signMessage: async ({message}) => {
      //         return "0x.."
      //     },
      //     signTypedData: async (typeData) => {
      //         return signer.signTypedData(typeData.domain, {
      //             [typeData.primaryType]: typeData[typeData.primaryType]
      //         }, typeData.message)
      //     }

      //   }

      const safeAccount = await signerToSafeSmartAccount(publicClient, {
        entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
        signer: customSigner,
        safeVersion: "1.4.1",
        saltNonce: 0n,
      });
      console.log(Boolean(safeAccount.address));
      if (safeAccount && safeAccount.address) {
        setsafeacc(safeAccount.address);
      } else {
        // Throw an error or handle it based on your requirements
        throw new Error("Invalid safe account address");
      }
      console.log(typeof safeAccount["address"]);
      let safeString = safeAccount["address"];
      setsafeacc(safeString);
      // console.log(safeAccount["address"].toString());
      // setsafeacc(safeAccount["address"].toString());
      console.log(safeAccount["address"]);
      const smartAccountClient = createSmartAccountClient({
        account: safeAccount,
        chain: "goerli",
        transport: http(
          "https://api.pimlico.io/v1/goerli/rpc?apikey=f9dae1b5-1aea-471d-a6c1-18c0f20398b0"
        ),
        sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
      });
      console.log("smartAccountClient created Succesfully");

      const token0 = tokene; // Address of the ERC-20 token
      const token1 = tokeno; // Address of the ERC-20 token
      const value2 = value; // Amount of the ERC-20 token to transfer
      const Router = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
      // // Read the ERC-20 token contract
      // const ERC20_ABI = require("./erc20Abi.json").default; // ERC-20 ABI in json format
      // const Swap_ABI = require("./Swap.json").default; // ERC-20 ABI in json format

      const erc20 = new ethers.Contract(
        token0,
        [
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        provider
      );
      const decimals = 18;
      const amount2 = parseUnits(value2, decimals);
      console.log(amount2);

      const tokenCon = getContract({
        address: token1,
        abi: [
          {
            inputs: [
              {
                internalType: "address",
                name: "spender",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "value",
                type: "uint256",
              },
            ],
            name: "approve",
            outputs: [
              {
                internalType: "bool",
                name: "",
                type: "bool",
              },
            ],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        publicClient,
        walletClient: smartAccountClient,
        maxFeePerGas: gasPrices.fast.maxFeePerGas, // if using Pimlico
        maxPriorityFeePerGas: gasPrices.fast.maxPriorityFeePerGas, // if using Pimlico
      });
      console.log("Creating Router");

      const routerCon = getContract({
        address: "0xE592427A0AEce92De3Edee1F18E0157C05861564",
        abi: [
          {
            inputs: [
              {
                components: [
                  {
                    internalType: "address",
                    name: "tokenIn",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "tokenOut",
                    type: "address",
                  },
                  {
                    internalType: "uint24",
                    name: "fee",
                    type: "uint24",
                  },
                  {
                    internalType: "address",
                    name: "recipient",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "deadline",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "amountIn",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "amountOutMinimum",
                    type: "uint256",
                  },
                  {
                    internalType: "uint160",
                    name: "sqrtPriceLimitX96",
                    type: "uint160",
                  },
                ],
                internalType: "struct ISwapRouter.ExactInputSingleParams",
                name: "params",
                type: "tuple",
              },
            ],
            name: "exactInputSingle",
            outputs: [
              {
                internalType: "uint256",
                name: "amountOut",
                type: "uint256",
              },
            ],
            stateMutability: "payable",
            type: "function",
          },
        ],
        publicClient,
        walletClient: smartAccountClient,
        maxFeePerGas: gasPrices.fast.maxFeePerGas, // if using Pimlico
        maxPriorityFeePerGas: gasPrices.fast.maxPriorityFeePerGas, // if using Pimlico
      });

      console.log("Created Router");
      console.log("sending Transaction");
      console.log(tokenCon);
      setIsLoading(true);

      const txHash = await tokenCon.write.approve([Router, amount2]);
      console.log(txHash);

      console.log(safeString);

      const txHash2 = await routerCon.write.exactInputSingle([
        {
          tokenIn: token1,
          tokenOut: token0,
          fee: 500,
          recipient: safeString,
          deadline: 1801670579,
          amountIn: amount2,
          amountOutMinimum: 0,
          sqrtPriceLimitX96: 0,
        },
      ]);
      console.log(txHash2);
      setIsLoading(false);
      setIsCompleted(true);
      setTimeout(() => {
        setIsCompleted(false);
      }, 5000);
    }
    main();
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-r from-purple-400 to-pink-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
            
              <div className="w-full ">
                <div className="flex justify-between items-center">
                  <MetaMaskButton
                    theme={"light"}
                    color="white"
                  ></MetaMaskButton>
                 <div className="flex items-center justify-center">
                 <input className="mr-3 text-black text-center font-bold text-xl to-black w-24 focus:outline-none rounded-lg" value={value} onChange={(e) => {
                    setvalue(e.target.value);
                  }}/><p>Tokens</p>
                 </div>
                 
                  
                </div>
                
                <p className="px-2 py-1 mt-2 border rounded-lg">{tokene}</p>
                <GoArrowSwitch className="w-full rotate-[90deg] text-lg text-black font-semibold my-2 text-center" />
                <p className="px-2 py-1 mt-2 border rounded-lg">{tokeno}</p>
                <button
                  onClick={func}
                  className="w-full mt-2 bg-white text-black py-1 rounded-lg hover:bg-gray-300"
                >
                {
                   isLoading ? <Loader /> :( isCompleted ? "Completed" : "Swap")
                }
                   
                

                 
                </button>
              </div>

              {/* <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="bg-white hover:opacity-90 transition-opacity text-red-500 hover:text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button>
              </div> */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SpringModal;
