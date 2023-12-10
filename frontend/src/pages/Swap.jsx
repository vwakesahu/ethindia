import { useState } from "react";
import SpringModal from "../components/SpringModal";

export const Swap = () => {
  const [isVisible, setIsVisible] = useState(false);
  return <SpringModal isOpen={isVisible} setIsOpen={isVisible} />;
};


