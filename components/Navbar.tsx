import React from "react";
import { WalletOptions } from "./WalletOptions";

const Navbar = () => {
  return (
    <div className="mt-4 flex justify-around  ">
      <div className="text-3xl">Meteora</div>
      <WalletOptions />
    </div>
  );
};

export default Navbar;
