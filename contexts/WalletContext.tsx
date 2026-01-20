"use client";

import { createContext, useContext, ReactNode } from "react";
import { useAccount, useDisconnect } from "wagmi";

interface WalletContextType {
  isConnected: boolean;
  walletAddress?: string;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletAddress: address,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }
  return context;
};
