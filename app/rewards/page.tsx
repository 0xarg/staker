"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, TrendingUp, Clock, Zap, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import WalletModal from "@/components/WalletModal";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { STAKING_PROXY } from "@/lib/config";
import { useReadContract, useWriteContract } from "wagmi";
import { abi } from "@/lib/abi";
import { formatEther } from "viem";

const Rewards = () => {
  const { walletAddress } = useWallet();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const {
    mutate,
    isPending,
    isSuccess,
    data: hash,
    error,
  } = useWriteContract();
  const { data: userRewards, refetch: refreshRewards } = useReadContract({
    address: STAKING_PROXY,
    abi,
    functionName: "userRewards",
    args: [walletAddress],
  });

  const rewardsSummary = {
    totalEarned:
      userRewards && typeof userRewards === "bigint"
        ? formatEther(userRewards).slice(0, 4)
        : "0",
    claimable:
      userRewards && typeof userRewards === "bigint"
        ? formatEther(userRewards).slice(0, 4)
        : "0",
    pending:
      userRewards && typeof userRewards === "bigint"
        ? formatEther(userRewards).slice(0, 4)
        : "0",
    nextReward: " ",
  };

  const rewardHistory = [
    {
      date: "Jan 19, 2026",
      amount: "0.125 ETH",
      type: "Daily Reward",
      status: "Pending",
    },
    {
      date: "Jan 18, 2026",
      amount: "0.124 ETH",
      type: "Daily Reward",
      status: "Claimed",
    },
    {
      date: "Jan 17, 2026",
      amount: "0.123 ETH",
      type: "Daily Reward",
      status: "Claimed",
    },
    {
      date: "Jan 16, 2026",
      amount: "0.122 ETH",
      type: "Daily Reward",
      status: "Claimed",
    },
    {
      date: "Jan 15, 2026",
      amount: "0.500 ETH",
      type: "Bonus Reward",
      status: "Claimed",
    },
  ];

  const handleClaim = () => {
    mutate({
      address: STAKING_PROXY,
      abi,
      functionName: "claimReward",
    });
    toast({
      title: "Claiming...",
      description: "Processing your reward claim",
    });
    if (error) {
      console.log(error);
    }
    if (isSuccess) {
      toast({
        title: "Claimed...",
        description: "Processed your reward claim",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onConnectClick={() => setIsWalletModalOpen(true)} />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title mb-2">🎁 YOUR REWARDS</h1>
          <p className="text-muted-foreground uppercase text-sm tracking-wider">
            TRACK AND CLAIM YOUR STAKING REWARDS
          </p>
        </motion.div>

        {/* Rewards Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  TOTAL EARNED
                </p>
                <p className="text-3xl font-bold">
                  {rewardsSummary.totalEarned}{" "}
                  <span className="text-lg text-muted-foreground">StakeX</span>
                </p>
              </div>
              <div className="p-2 border-[2px] border-foreground bg-accent text-accent-foreground">
                <TrendingUp size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="stat-card bg-primary/10 border-primary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  CLAIMABLE NOW
                </p>
                <p className="text-3xl font-bold text-primary">
                  {rewardsSummary.claimable}{" "}
                  <span className="text-lg">StakeX</span>
                </p>
              </div>
              <div className="p-2 border-[2px] border-foreground bg-primary text-primary-foreground">
                <Gift size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  PENDING
                </p>
                <p className="text-3xl font-bold">
                  {rewardsSummary.pending}{" "}
                  <span className="text-lg text-muted-foreground">StakeX</span>
                </p>
              </div>
              <div className="p-2 border-[2px] border-foreground bg-secondary text-secondary-foreground">
                <Zap size={24} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  NEXT REWARD
                </p>
                <p className="text-3xl font-bold font-mono">
                  {rewardsSummary.nextReward}
                </p>
              </div>
              <div className="p-2 border-[2px] border-foreground bg-destructive text-destructive-foreground">
                <Clock size={24} />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Claim Card */}
          <motion.div
            className="card-web3 lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="font-bold uppercase mb-4 flex items-center gap-2">
              <Gift size={20} /> CLAIM REWARDS
            </h3>

            <div className="p-6 bg-primary/10 border-[3px] border-primary mb-6 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                AVAILABLE TO CLAIM
              </p>
              <p className="text-5xl font-bold text-primary mb-1">
                {rewardsSummary.claimable}
              </p>
              <p className="text-xl text-muted-foreground">ETH</p>
            </div>

            <motion.button
              onClick={handleClaim}
              className="w-full btn-primary-web3 text-lg py-4 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🎁 CLAIM NOW <ArrowRight size={20} />
            </motion.button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Gas fees apply. Rewards will be sent to your wallet.
            </p>
          </motion.div>

          {/* Reward History */}
          <motion.div
            className="card-web3 lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="font-bold uppercase mb-4">📊 REWARD HISTORY</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-[2px] border-foreground">
                    <th className="text-left py-3 text-xs uppercase tracking-wider text-muted-foreground">
                      Date
                    </th>
                    <th className="text-left py-3 text-xs uppercase tracking-wider text-muted-foreground">
                      Type
                    </th>
                    <th className="text-right py-3 text-xs uppercase tracking-wider text-muted-foreground">
                      Amount
                    </th>
                    <th className="text-right py-3 text-xs uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rewardHistory.map((reward, index) => (
                    <motion.tr
                      key={index}
                      className="border-b border-muted"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="py-4 text-sm">{reward.date}</td>
                      <td className="py-4 text-sm">{reward.type}</td>
                      <td className="py-4 text-sm text-right font-bold text-accent">
                        {reward.amount}
                      </td>
                      <td className="py-4 text-right">
                        <span
                          className={`px-2 py-1 text-xs font-bold uppercase border-[2px] border-foreground ${
                            reward.status === "Claimed"
                              ? "bg-accent text-accent-foreground"
                              : "bg-primary text-primary-foreground"
                          }`}
                        >
                          {reward.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
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

export default Rewards;
