import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage , ConnectNewWallet} from "./pages/index";
import { NavBar } from "./components/index";
import DoTransaction from "./pages/DoTransaction";
import { Metamask } from "./pages/Metamask";
import { Demo } from "./pages/Demo";
const App = () => {



  return (
    <div>
      
      <Router>
        <NavBar />
        <div className="mx-16">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            {/* <Route path="/swap" element={<Swap />} /> */}
            <Route path="/connect-n-wallet" element={<ConnectNewWallet />} />
            <Route path="/transaction" element={<DoTransaction />} />
            <Route path="/metamask-connect" element={<Metamask />} />
            <Route path="/connect-ex-wallet" element={<ConnectNewWallet />} />
            <Route path="/demo" element={<Demo />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;