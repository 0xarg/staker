"use client";
import { abi } from "@/lib/abi";
import { formatEther, parseEther } from "viem";
import {
  useWriteContract,
  useReadContract,
  useAccount,
  useBalance,
  useEnsName,
} from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export function Dashboard() {
  const {
    mutate,
    isPending,
    isSuccess,
    data: hash,
    error,
  } = useWriteContract();
  const amountRef1 = useRef<HTMLInputElement>(null);
  const amountRef2 = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const { address } = useAccount();

  const { data: balance, refetch } = useReadContract({
    address: "0x9f82462BF164EDCD5f10F3596C3D9A307DBb3875",
    abi,
    functionName: "stakedBalance",
    args: [address],
  });
  //   setBalance((stakedBal as bigint)?.toString() || "0");

  const handleStake = () => {
    const amount = amountRef1.current?.value;
    console.log(amount);
    const amountEth = parseEther(amount ?? "0");
    console.log(amountEth);

    mutate({
      address: "0x9f82462BF164EDCD5f10F3596C3D9A307DBb3875",
      abi,
      functionName: "stake",
      args: [BigInt(amountEth)],
      value: BigInt(amountEth),
    });
    if (isSuccess) {
      toast.success("Successfully staked eth,");
    }

    if (error) {
      toast.error("Error Staking, check console for logs");
    }
  };

  const handleUnStake = useCallback(async () => {
    const amount = amountRef2.current?.value;
    console.log(amount);
    const amountEth = parseEther(amount ?? "0");
    console.log(amountEth);

    await mutate({
      address: "0x9f82462BF164EDCD5f10F3596C3D9A307DBb3875",
      abi,
      functionName: "unstake",
      args: [BigInt(amountEth)],
      value: BigInt(amountEth),
    });
    if (error) {
      toast.error("Error UnStaking, check console for logs");
    }
    refetch();
    if (isSuccess) {
      toast.success("Successfully Unstaked eth,");
    }
  }, [amountRef2]);

  const sync = useCallback(async () => {
    setLoading(true);
    await refetch();
    setLoading(false);
  }, [refetch]);

  return (
    <div className="h-screen w-screen flex gap-10 justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Staked Balance</CardTitle>
          <CardDescription>
            Total amount you have staked with us
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-neutral-100 text-center rounded-md py-3 px-2">
          <p className="font-semibold">
            {formatEther((balance as bigint) ?? "0n")} ETH
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => sync()} variant={"outline"} disabled={loading}>
            {loading ? "Syncing..." : "Refresh"}
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Stake</CardTitle>
          <CardDescription>Enter amount you want to stake</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Enter Amount in ETH</Label>
                <Input
                  id="amount"
                  type="text"
                  ref={amountRef1}
                  placeholder="0.001 ETH"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            disabled={isPending}
            onClick={() => handleStake()}
            className="w-full"
          >
            {isPending ? "Staking" : "Stake"}
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>UnStake</CardTitle>
          <CardDescription>Enter amount you want to UnStake</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Enter Amount in ETH</Label>
                <Input
                  id="amount"
                  type="text"
                  ref={amountRef2}
                  placeholder="0.001 ETH"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={() => handleUnStake()} className="w-full">
            UnStake
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

//   function ShowStake() {
//     const { data: balance, refetch } = useReadContract({
//       address: "0x9f82462BF164EDCD5f10F3596C3D9A307DBb3875",
//       abi,
//       functionName: "stakedBalance",
//       args: ["0xE0992D80e2824E98cf5e76d6b9e7d02abEF77F5a"],
//     });
//     //   console.log(balance);
//     return (
//       <div>
//         You have staked {balance ? `${balance.toString()} ETH` : "0 ETH"}
//         <br />
//         <button onClick={() => refetch()}>Refresh Balance</button>
//       </div>
//     );
//   }
