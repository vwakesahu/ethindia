import React, { useState } from "react";
import Button from "./Button";
import AnimationData from "../assets/heroAnimation.json";
import Lottie from "lottie-react";



const HeroSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopup = () => {
    setIsPopupOpen(!isPopupOpen);
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
          
          <p>
            Welcome to <mark>Something</mark>
          </p>
          <div className="w-6 h-6 overflow-hidden"></div>
        </div>
        <p className="md:-mt-30 text-[2.5rem] md:text-[3rem] font-bold tracking-wide leading-tight">
          Life is short, don't waste it in a
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-[3rem] md:text-[3rem]">
            &nbsp;queue.
          </span>
        </p>
        <p className="text-base text-lighttextGray md:text-left md:w-[85%] tracking-wide">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iste
          mollitia nobis debitis. Eos, voluptate dolorem ut enim consectetur,
          rem, accusantium molestias ipsam inventore repellendus dolores ad
          mollitia doloremque nemo!
        </p>
        <Button text={"Sometext"} />
      </div>

      <div className="py-2 flex-1 flex relative items-center">
        <div className="flex h-[55%] mr-auto border rounded-lg border-dotted bg-opacity-10 bg-white backdrop-blur-lg shadow-lg ">
          <Lottie animationData={AnimationData} className="" />
        </div>
      </div>

      <div className="relative">
        <div className="absolute -top-56">
          {/* <Demo /> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;