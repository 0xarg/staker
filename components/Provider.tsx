"use client";
import { config } from "@/lib/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { WagmiProvider } from "wagmi";
import { WalletProvider } from "@/contexts/WalletContext";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient();
  return (
    <div>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <WalletProvider>{children}</WalletProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default Provider;
