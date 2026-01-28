"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Zap, Clock, TrendingUp, AlertTriangle, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import WalletModal from "@/components/WalletModal";
import { toast } from "@/hooks/use-toast";
import { useBalance, useWriteContract } from "wagmi";
import { STAKING_PROXY } from "@/lib/config";
import { abi } from "@/lib/abi";
import { formatEther, parseEther } from "viem";
import { useWallet } from "@/contexts/WalletContext";
import PageLoader from "@/components/PageLoader";
import { useRouter } from "next/navigation";

const Stake = () => {
  const {
    mutate,
    isPending,
    isSuccess,
    data: hash,
    error,
  } = useWriteContract();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [lockPeriod, setLockPeriod] = useState(7);
  const { walletAddress } = useWallet();

  const result = useBalance({
    address: walletAddress as `0x${string}`,
  });
  const lockOptions = [
    { days: 0, apy: "0%", multiplier: "1x" },
    { days: 7, apy: "6%", multiplier: "1x" },
    { days: 14, apy: "8%", multiplier: "1.2x" },
    { days: 30, apy: "10%", multiplier: "1.5x" },
    { days: 90, apy: "15%", multiplier: "2x" },
  ];

  const selectedLock = lockOptions.find((l) => l.days === lockPeriod)!;
  const estimatedReward = amount
    ? (
        parseFloat(amount) *
        (parseFloat(selectedLock.apy) / 100) *
        (lockPeriod / 365)
      ).toFixed(4)
    : "0.0000";

  const handleStake = () => {
    if (!amount) {
      console.log("erro1");
      toast({
        title: "Invalid Amount",
        description: "Minimum stake is 0.01 ETH",
      });
      return;
    }
    const amountEth = parseEther(amount ?? "0");
    console.log(lockPeriod);
    console.log(amountEth);
    toast({
      title: "Staking...",
      description: `Staking ${amount} ETH for ${lockPeriod} days`,
    });
    mutate({
      address: STAKING_PROXY,
      abi,
      functionName: "stake",
      gas: 300000n,

      args: [lockPeriod * 24 * 60 * 60],
      value: BigInt(amountEth),
    });

    if (isSuccess) {
      toast({
        title: `Staked...`,
        description: `Staking ${amountEth} ETH for ${lockPeriod} days`,
      });
    }
    if (error) {
      console.log(error);
      toast({
        title: `Error While staking`,
        description: `Look for cosnsole,`,
      });
    }
  };

  useEffect(() => {
    if (!walletAddress) {
      router.push("/");
    }
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onConnectClick={() => setIsWalletModalOpen(true)} />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title mb-2">⚡ STAKE ETH</h1>
          <p className="text-muted-foreground uppercase text-sm tracking-wider">
            LOCK YOUR ETH AND START EARNING REWARDS
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stake Form */}
          <motion.div
            className="card-web3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="font-bold uppercase mb-6 flex items-center gap-2">
              <Zap size={20} /> STAKE AMOUNT
            </h3>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 block">
                AMOUNT (ETH)
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full p-4 bg-muted border-[3px] border-foreground text-2xl font-bold focus:outline-none focus:border-primary"
                />
                <button
                  onClick={() =>
                    setAmount(
                      result.data?.value
                        ? formatEther(result.data?.value).slice(0, 8)
                        : "N/A",
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase border-[2px] border-foreground"
                >
                  MAX
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Balance:{" "}
                {result.data?.value
                  ? formatEther(result.data?.value).slice(0, 8)
                  : "N/A"}
              </p>
            </div>

            {/* Lock Period */}
            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2 block flex items-center gap-2">
                <Clock size={14} /> LOCK PERIOD
              </label>
              <div className="grid grid-cols-2 gap-2">
                {lockOptions.map((option) => (
                  <motion.button
                    key={option.days}
                    onClick={() => setLockPeriod(option.days)}
                    className={`p-4 border-[3px] border-foreground text-left transition-colors ${
                      lockPeriod === option.days
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="font-bold text-lg">{option.days} DAYS</p>
                    <p className="text-sm opacity-80">
                      {option.apy} APY • {option.multiplier}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Stake Button */}
            <motion.button
              onClick={handleStake}
              className="w-full btn-primary-web3 text-lg py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ⚡ STAKE NOW
            </motion.button>
          </motion.div>

          {/* Summary */}
          <motion.div
            className="card-web3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="font-bold uppercase mb-6 flex items-center gap-2">
              <TrendingUp size={20} /> STAKE SUMMARY
            </h3>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center p-3 bg-muted border-[2px] border-foreground">
                <span className="text-muted-foreground text-sm uppercase">
                  Amount
                </span>
                <span className="font-bold">{amount || "0.00"} ETH</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted border-[2px] border-foreground">
                <span className="text-muted-foreground text-sm uppercase">
                  Lock Period
                </span>
                <span className="font-bold">{lockPeriod} DAYS</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted border-[2px] border-foreground">
                <span className="text-muted-foreground text-sm uppercase">
                  APY Rate
                </span>
                <span className="font-bold text-accent">
                  {selectedLock.apy}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted border-[2px] border-foreground">
                <span className="text-muted-foreground text-sm uppercase">
                  Multiplier
                </span>
                <span className="font-bold text-primary">
                  {selectedLock.multiplier}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-accent/20 border-[3px] border-accent">
                <span className="font-bold uppercase">Est. Rewards</span>
                <span className="font-bold text-xl text-accent">
                  {estimatedReward} ETH
                </span>
              </div>
            </div>

            {/* Important Notes */}
            <div className="p-4 bg-destructive/10 border-[2px] border-destructive">
              <div className="flex items-start gap-2">
                <AlertTriangle
                  size={20}
                  className="text-destructive flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="font-bold text-sm uppercase mb-1">IMPORTANT</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li className="flex items-center gap-1">
                      <Check size={12} /> Stakes are locked until period ends
                    </li>
                    <li className="flex items-center gap-1">
                      <Check size={12} /> Early withdrawal: 10% penalty
                    </li>
                    <li className="flex items-center gap-1">
                      <Check size={12} /> Rewards compound daily
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
};

export default Stake;
