"use client";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import { useState } from "react";
import {
  useBalance,
  useConnect,
  useConnection,
  useConnectors,
  useDisconnect,
} from "wagmi";
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
  const connect = useConnect();
  const connection = useConnection();
  const connectors = useConnectors();
  const { connector } = getConnection(config);
  const disconnect = useDisconnect(); // Use the hook for disconnection

  return (
    <div>
      {!connection.address && (
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
                    connect.mutate({ connector });
                  }}
                >
                  {connector.name}
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {connection.address && (
        <div className="flex gap-2">
          <Input
            disabled
            value={connection.address.slice(0, 12) + "...."}
            className="w-fit"
          />
          <Button onClick={() => disconnect.mutate({ connector })}>
            Disconnect
          </Button>
        </div>
      )}

      <br />
    </div>
  );
}
