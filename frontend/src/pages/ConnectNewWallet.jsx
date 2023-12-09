import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

const ConnectNewWallet = () => {
  const [emaol, setEmaol] = useState("");
  const [username, setUsername] = useState("");
  const [senderAccount, setsenderAccount] = useState([]);
  const navigate = useNavigate();

  const wssethProvider =
    "wss://eth-mainnet.g.alchemy.com/v2/e3GZ84yye7MSD8J9SGMKxTlkLmEMSuF_";
  const createETHAddress = async (e, res) => {
    e.preventDefault();
    try {
      let email = emaol;
      let userId = username;
      const web3 = new Web3(
        new Web3.providers.WebsocketProvider(wssethProvider)
      );
      web3.setProvider(new Web3.providers.WebsocketProvider(wssethProvider));
      const account = web3.eth.accounts.wallet.create(1, `${email}${userId}`);
      const accountKeyStore = web3.eth.accounts.encrypt(
        account[0].privateKey,
        `SMART__07b7ee54020142cb8d7b2a6c963a0b4e`
      );
      console.log(account);
      setsenderAccount(account);
      localStorage.setItem("account", JSON.stringify(senderAccount[0]));
      console.log(localStorage.getItem("account"));
      // navigate("/transaction", { state: { account: senderAccount[0] } });
      navigate("/transaction");
      // res.json({
      //   status: "ok",
      //   account: account[0],
      //   accountKeyStore,
      // });

      // console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="text-black">
      <form>
        <input
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <input
          placeholder="email"
          onChange={(e) => {
            setEmaol(e.target.value);
          }}
          value={emaol}
        />
        <button onClick={createETHAddress}>Save</button>
      </form>
    </div>
  );
};

export default ConnectNewWallet;
