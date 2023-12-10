import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <div className="p-1 flex items-center justify-center">
      <button onClick={onClick} className="px-6 py-2 font-medium  bg-gradient-to-r from-purple-400 to-pink-600 text-white w-fit transition-all ease-in-out shadow-[3px_3px_0px_white] rounded-sm hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
        {text}
      </button>
    </div>
  );
};

export default Button;
