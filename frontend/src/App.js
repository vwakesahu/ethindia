import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, ConnectWallet, Swap } from "./pages/index";
import { NavBar } from "./components/index";
const App = () => {
  return (
    <div>
      {" "}
      <Router>
        <NavBar />
        <div className="mx-16">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/connect-wallet" element={<ConnectWallet />} />
          </Routes>
        </div>{" "}
      </Router>
    </div>
  );
};

export default App;
