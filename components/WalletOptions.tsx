"use client";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { disconnect, getConnection } from "wagmi/actions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function WalletOptions() {
  const { connect, connectors } = useConnect();
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {!address && (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Connect to Wallet</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-106.25">
            <DialogHeader>
              <DialogTitle>Connect Wallet</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col    gap-2">
              {connectors.map((connector) => (
                <Button
                  variant={"outline"}
                  key={connector.uid}
                  onClick={() => {
                    connect({ connector });
                  }}
                >
                  {connector.name}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {address && (
        <div className="flex gap-2">
          <Input
            disabled
            value={address.slice(0, 12) + "...."}
            className="w-fit"
          />
          <Button onClick={() => disconnect({ connector })}>Disconnect</Button>
        </div>
      )}

      <br />
    </div>
  );
}
