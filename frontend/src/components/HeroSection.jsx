import React, { useState } from "react";
import Button from "./Button";
import AnimationData from "../assets/heroAnimation.json";
import Lottie from "lottie-react";
import { ethers } from "ethers";
import Loader from "./Loader";

import SpringModal from "./SpringModal";
import { MetaMaskButton } from "@metamask/sdk-react-ui";

const HeroSection = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const [isModal, setIsModal] = useState(false);
  const handler = () => {
    setIsModal(!isModal);
  };
  const handleSigner = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // Signers are authenticated providers connected to the current address in MetaMask.
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
        return signer.signTypedData(
          typeData.domain,
          {
            [typeData.primaryType]: typeData[typeData.primaryType],
          },
          typeData.message
        );
      },
    };
    console.log(customSigner);
  };

  return (
    // <div className="md:pt-32 mt-16">
    //   <div className="flex flex-col justify-center items-center gap-3 ">
    //     <p className="text-[2.5rem] font-semibold leading-tight max-w-md text-center">
    //       The easiest way to scale your analytics
    //     </p>
    //     <p className="max-w-xl mt-3 text-center">
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae
    //       dolore vitae minus dolorum.
    //     </p>
    //     <div className="mt-2">
    //       <Button text={"Try it free"} onClick={handlePopup} />
    //     </div>
    //   </div>

    //   <div className="mt-16 md:mt-32">
    //     <Marquee1 />
    //   </div>

    //   <SpringModal isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} />

    //   {/* <SlideInNotifications /> */}

    // </div>

    // <div className="flex items-center justify-center">
    //   <div className="grid grid-cols-2 items-center max-w-6xl justify-center pb-32">
    //     <div className="h-full">

    //     </div>

    //   </div>
    // </div>

    <section
      className="-z-40 grid grid-cols-1 md:grid-cols-2 gap-10 w-full -mt-32"
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-4">
        <div className="flex items-center gap-2 justify-start p-2">
          {/* <SpringModal isOpen={isModal} setIsOpen={setIsModal} /> */}
          <p>
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-xl">
              FrictionlessDEX
            </span>
          </p>
          <div className="w-6 h-6 overflow-hidden"></div>
        </div>
        <p className="md:-mt-30 text-[2.5rem] md:text-[3rem] font-bold tracking-wide leading-tight">
          Frictionless DEX: Gasless Swaps Made Easy with
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-[3rem] md:text-[3rem]">
            &nbsp; Multi-Chain Support.
          </span>
        </p>
        <p className="text-base text-lighttextGray md:text-left md:w-[85%] tracking-wide">
          Welcome to our Frictionless DEX, a cutting-edge decentralized exchange
          (DEX) that brings forth a user-friendly solution for gasless token
          swaps, supporting both EOA(Externally Owned Accounts) and
          ERC4337(Smart Wallet) wallets across various blockchain networks.
        </p>
        {/* <div onClick={()=> setIsModal(!isModal)}><Button text={" 🦊 Connect MetaMask"} /></div>
        {
          isModal && <SpringModal isOpen={isModal} setIsOpen={setIsModal} />
        } */}
        <div className="text-blac flex gap-5">
          <MetaMaskButton theme={"dark"} color="black"></MetaMaskButton>
          <button
            className=" bg-gradient-to-r from-purple-400 to-pink-600  text-white text-black text-left px-12 py-1 rounded-lg "
            onClick={handler}
          >
            {" "}
            Swap
          </button>
          {isModal && <SpringModal isOpen={isModal} setIsOpen={setIsModal} />}
          {/* <button onClick={handleSigner}>Get Signer</button> */}
        </div>
      </div>

      <div className="py-2 flex-1 flex relative items-center">
        <div className="flex h-[55%] mr-auto border rounded-lg border-dotted bg-opacity-10 bg-white backdrop-blur-lg shadow-lg ">
          <Lottie animationData={AnimationData} className="" />
        </div>
      </div>

      <div className="relative">
        <div className="absolute -top-56">{/* <Demo /> */}</div>
      </div>
    </section>
  );
};

export default HeroSection;
