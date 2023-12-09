import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import Web3 from "web3";
import { Network, Alchemy } from "alchemy-sdk";
import BigNumber from "bignumber.js";

export const DoTransaction = () => {
  const [address, setaddress] = useState("");
  const [amount, setamount] = useState(0);
  const [account, setaccount] = useState({});

  const wssethProvider =
    "wss://eth-mainnet.g.alchemy.com/v2/e3GZ84yye7MSD8J9SGMKxTlkLmEMSuF_";

  // useEffect(() => {
  //     const fetch = () => {
  //         const AccountInfo =
  //           localStorage.getItem("account") !== "undefined"
  //             ? JSON.parse(localStorage.getItem("account"))
  //             : localStorage.clear();

  //         return AccountInfo;
  //       };
  //     setaccount(fetch());
  //     console.log(fetch());

  //   return () => {
  //     account;
  //   }
  // }, [])

  const getCurrentGasPrices = async () => {
    // const response = await fetch(
    //   "https://ethgasstation.info/api/ethgasAPI.json"
    // );
    // const data = await response.json();
    // return {
    //   low: data.safeLow / 10,
    //   average: data.average / 10,
    //   high: data.fast / 10,
    // };
    const settings = {
        apiKey: "e3GZ84yye7MSD8J9SGMKxTlkLmEMSuF_", // Replace with your Alchemy API Key.
        network: Network.ETH_SEPOLIA, // Replace with your network.
      };
      const alchemy = new Alchemy(settings);
    
      alchemy.core.getGasPrice().then((gasPrice) => {
        let price= new BigNumber(gasPrice['_hex']);
        console.log(price.toFraction());
        return price.toFraction;
    }
      );
  };
  //   const getCurrentGasPrices = async () => {
  //     const alchemyApiKey = 'e3GZ84yye7MSD8J9SGMKxTlkLmEMSuF_'; // Replace with your Alchemy API key
  //     const alchemyUrl = `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`;

  //     try {
  //       const response = await fetch(alchemyUrl);
  //       const data = await response.json();

  //       if (data && data.result && data.result.fast) {
  //         // You can adjust the property names based on your Alchemy response structure
  //         const { fast, average, safeLow } = data.result;
  //         return { low: safeLow, average, high: fast };
  //       } else {
  //         throw new Error('Failed to fetch gas prices from Alchemy');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching gas prices:', error);
  //       throw error;
  //     }
  //   };

  const transferEth = async (e) => {
    e.preventDefault();
    try {
      const web3 = new Web3(
        new Web3.providers.WebsocketProvider(wssethProvider)
      );
      web3.setProvider(new Web3.providers.WebsocketProvider(wssethProvider));
      web3.eth.defaultAccount = "0xA1763dc1a0356B8038d0dE76d9967B717f1460E1"; //address of user

      //   let amount = amount;
      let to = address;
      let sendersPrivateKey =
        "0x760bec1b10b33e926cd28300bd2ace5eeaf0c909e9b9adf8cdf59ab48b60d7f2"; // privarte key of sender
      let from = web3.eth.defaultAccount;
      //   const privateKey = await Buffer.from(sendersPrivateKey.substr(2), "hex");/
      const privateKey = sendersPrivateKey;

      const myBalanceWei = await web3.eth.getBalance(web3.eth.defaultAccount);
      const myBalance = web3.utils.fromWei(myBalanceWei, "ether");
      console.log(`Your wallet balance is currently ${myBalance}`);

      const nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
      console.log(
        `The outgoing transaction count for your wallet address is: ${nonce}`
      );

      const gasPrices = await getCurrentGasPrices();
      console.log(`The current gas price is ${gasPrices.low} ETH/GAS`);

      const details = {
        from,
        to,
        value: web3.utils.toHex(web3.utils.toWei(amount, "ether")),
        gasLimit: 21000,
        gasPrice: gasPrices.low * 1000000000, // converts the gwei price to wei
        nonce,
        chainId: 4, // EIP 155 chainId - mainnet: 1, rinkeby: 4
      };

      const transaction = new EthereumTx.Transaction(details, {
        chain: "sepoliaEthereum",
      });
      await transaction.sign(privateKey);

      const serializedTransaction = await transaction.serialize();
      const sd = String(`0x${serializedTransaction.toString("hex")}`);
      const transactionId = await web3.eth.sendSignedTransaction(sd);
      console.log(transaction);
      console.log(transactionId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-black">
      <form>
        <input
          onChange={(e) => {
            setaddress(e.target.value);
          }}
          placeholder="public address"
          value={address}
        />
        <input
          onChange={(e) => {
            setamount(e.target.value);
          }}
          placeholder="amount"
          value={amount}
        />
        <button onClick={transferEth}>Transfer</button>
      </form>
    </div>
  );
};

export default DoTransaction;
