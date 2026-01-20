"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Gift,
  Trophy,
  Shield,
  Clock,
  TrendingUp,
  Users,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import WalletModal from "@/components/WalletModal";
import Footer from "@/components/Footer";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useConnection } from "wagmi";

const Index = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const { isConnected } = useWallet();
  const router = useRouter();
  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    }
  }, [isConnected, router]);

  const features = [
    {
      icon: Zap,
      title: "INSTANT STAKING",
      description:
        "Stake your ETH in seconds with our optimized smart contracts",
    },
    {
      icon: Gift,
      title: "DAILY REWARDS",
      description: "Earn compounding rewards every 24 hours automatically",
    },
    {
      icon: Shield,
      title: "AUDITED SECURITY",
      description: "Smart contracts audited by leading security firms",
    },
    {
      icon: TrendingUp,
      title: "8% APY",
      description: "Competitive annual percentage yield on all stakes",
    },
  ];

  const stats = [
    { value: "12,450+", label: "ETH STAKED" },
    { value: "3,200+", label: "ACTIVE STAKERS" },
    { value: "$2.5M+", label: "REWARDS PAID" },
    { value: "99.9%", label: "UPTIME" },
  ];

  const steps = [
    {
      num: "01",
      title: "CONNECT WALLET",
      description: "Connect your MetaMask, WalletConnect, or Coinbase wallet",
    },
    {
      num: "02",
      title: "STAKE ETH",
      description:
        "Choose your stake amount and lock period for maximum rewards",
    },
    {
      num: "03",
      title: "EARN REWARDS",
      description: "Watch your rewards grow daily with 8% APY compounding",
    },
    {
      num: "04",
      title: "CLAIM ANYTIME",
      description: "Claim rewards anytime, unstake after lock period ends",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onConnectClick={() => setIsWalletModalOpen(true)} />

      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b-[3px] border-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="inline-block px-4 py-2 bg-primary border-[2px] border-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-sm font-bold uppercase">
              🔥 LIVE ON Testnet
            </span>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-9xl font-bold uppercase tracking-tighter mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            STAKEX
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl uppercase tracking-widest text-muted-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            STAKE • EARN • WIN • REPEAT
          </motion.p>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            The most competitive ETH staking platform. Lock your ETH, earn daily
            rewards, and compete for bonus tiers. Built for serious stakers.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.button
              onClick={() => setIsWalletModalOpen(true)}
              className="btn-primary-web3 text-lg flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ⚡ START STAKING <ArrowRight size={20} />
            </motion.button>
            <motion.button
              className="btn-outline-web3 text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              LEARN MORE
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-secondary border-b-[3px] border-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-bold text-secondary-foreground">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 border-b-[3px] border-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="section-title mb-2">⚡ WHY STAKEX?</h2>
            <p className="text-muted-foreground uppercase text-sm tracking-wider">
              THE ULTIMATE ETH STAKING EXPERIENCE
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card-web3 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="inline-block p-3 bg-primary border-[2px] border-foreground mb-4">
                  <feature.icon size={28} className="text-primary-foreground" />
                </div>
                <h3 className="font-bold uppercase mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 border-b-[3px] border-foreground">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="section-title mb-2">📋 HOW IT WORKS</h2>
            <p className="text-muted-foreground uppercase text-sm tracking-wider">
              START EARNING IN 4 SIMPLE STEPS
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                className="card-web3 relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <span className="text-6xl font-bold text-muted opacity-20 absolute top-2 right-4">
                  {step.num}
                </span>
                <h3 className="font-bold uppercase mb-2 relative z-10">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground relative z-10">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold uppercase mb-4 text-secondary-foreground">
              READY TO EARN?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of stakers earning daily rewards. Connect your
              wallet and start staking today.
            </p>
            <motion.button
              onClick={() => setIsWalletModalOpen(true)}
              className="btn-primary-web3 text-xl px-10 py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              CONNECT WALLET
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />
    </div>
  );
};

export default Index;
