"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  Wallet,
  Gift,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import StakingCard from "@/components/StakingCard";
import WalletModal from "@/components/WalletModal";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { useReadContract, useWriteContract } from "wagmi";
import { abi } from "@/lib/abi";

const Dashboard = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { walletAddress } = useWallet();

  const {
    mutate,
    isPending,
    isSuccess,
    data: hash,
    error,
  } = useWriteContract();

  const { data: totalStaked, refetch } = useReadContract({
    address: walletAddress as `0x${string}` | undefined,
    abi,
    functionName: "totalStaked",
  });

  const stats = [
    {
      label: "TOTAL STAKED",
      value: "1,234.56",
      unit: "ETH",
      icon: Coins,
      iconColor: "bg-primary text-primary-foreground",
    },
    {
      label: "YOUR STAKE",
      value: "12.50",
      unit: "ETH",
      icon: Wallet,
      iconColor: "bg-accent text-accent-foreground",
    },
    {
      label: "CLAIMABLE REWARDS",
      value: "0.847",
      unit: "ETH",
      icon: Gift,
      iconColor: "bg-primary text-primary-foreground",
    },
    {
      label: "UNLOCK TIME",
      value: "5D 12H",
      unit: "",
      icon: Clock,
      iconColor: "bg-destructive text-destructive-foreground",
    },
  ];

  const recentActivity = [
    {
      type: "Stake",
      amount: "2.5 ETH",
      time: "2 hours ago",
      status: "success",
    },
    {
      type: "Reward Claim",
      amount: "0.125 ETH",
      time: "1 day ago",
      status: "success",
    },
    { type: "Stake", amount: "5.0 ETH", time: "3 days ago", status: "success" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onConnectClick={() => setIsWalletModalOpen(true)} />

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title text-3xl mb-2">👋 WELCOME BACK</h1>
          <p className="text-muted-foreground font-mono text-sm">
            {walletAddress}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold">
                    {stat.value}{" "}
                    <span className="text-lg text-muted-foreground">
                      {stat.unit}
                    </span>
                  </p>
                </div>
                <div
                  className={`p-2 border-[2px] border-foreground ${stat.iconColor}`}
                >
                  <stat.icon size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Staking Card - Takes 2 columns */}
          <div className="lg:col-span-2">
            <StakingCard
              isConnected={true}
              onStake={() => toast({ title: "Opening stake dialog..." })}
              onUnstake={() =>
                toast({ title: "Locked", description: "Stake is still locked" })
              }
              onClaim={() => toast({ title: "Claiming rewards..." })}
            />
          </div>

          {/* Recent Activity */}
          <motion.div
            className="card-web3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold uppercase">📊 RECENT ACTIVITY</h3>
              <Link
                href="/history"
                className="text-primary text-sm font-semibold uppercase flex items-center gap-1 hover:underline"
              >
                VIEW ALL <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="p-3 bg-muted border-[2px] border-foreground flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-sm uppercase">
                      {activity.type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">{activity.amount}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 space-y-2">
              <Link href="/stake">
                <motion.button
                  className="w-full btn-primary-web3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ⚡ STAKE MORE
                </motion.button>
              </Link>
              <Link href="/rewards">
                <motion.button
                  className="w-full btn-outline-web3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  🎁 VIEW REWARDS
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Performance Chart Placeholder */}
        <motion.div
          className="card-web3 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold uppercase flex items-center gap-2">
              <TrendingUp size={20} /> REWARDS GROWTH
            </h3>
            <div className="flex gap-2">
              {["7D", "30D", "90D", "ALL"].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1 text-xs font-bold uppercase border-[2px] border-foreground ${period === "30D" ? "bg-primary text-primary-foreground" : "bg-transparent"}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="h-48 flex items-center justify-center bg-muted border-[2px] border-foreground">
            <p className="text-muted-foreground uppercase text-sm">
              📈 Chart Coming Soon
            </p>
          </div>
        </motion.div>
      </div>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
