
import React, { useEffect } from "react";
import { SafeAuthPack } from "@safe-global/auth-kit";

export const ConnectWallet = () => {
  const safeAuthInitOptions = {
    showWidgetButton: false,
    chainConfig: {
      blockExplorerUrl: "https://etherscan.io",
      chainId: "0x5",
      displayName: "Ethereum Goerli",
      rpcTarget: "https://rpc.ankr.com/eth_goerli",
      ticker: "ETH",
      tickerName: "Ethereum",
    },
  };

  useEffect(() => {
    const initializeSafeAuth = async () => {
      const safeAuthPack = new SafeAuthPack();
      await safeAuthPack.init(safeAuthInitOptions);

      // You can use the initialized `safeAuthPack` instance as needed
    };

    initializeSafeAuth();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <div>
      {/* Your React component content */}
    </div>
  );
};

