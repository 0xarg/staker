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
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import WalletModal from "@/components/WalletModal";
import Footer from "@/components/Footer";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useConnection } from "wagmi";
import HeroSection from "@/components/HeroSection";

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
  const badges = [
    {
      icon: Zap,
      label: "INSTANT STAKES",
      color: "bg-primary text-primary-foreground",
    },
    {
      icon: Gift,
      label: "ETH REWARDS",
      color: "bg-accent text-accent-foreground",
    },
    {
      icon: Trophy,
      label: "WEEKLY BATTLES",
      color: "bg-secondary text-secondary-foreground",
    },
  ];

  const floatingStats = [
    { value: "8%", label: "APY", icon: TrendingUp },
    { value: "24/7", label: "UPTIME", icon: Shield },
    { value: "7D", label: "MIN LOCK", icon: Clock },
  ];

  // Letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut" as const,
      },
    }),
  };

  const titleText = "STAKEX";

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
      <section className="relative py-20 md:py-32 lg:py-40 border-b-[3px] border-foreground overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at center, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
            animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 left-[10%] w-20 h-20 border-2 border-primary/20"
            animate={{ rotate: 360, y: [0, -20, 0] }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity },
            }}
          />
          <motion.div
            className="absolute top-40 right-[15%] w-16 h-16 border-2 border-accent/20 rotate-45"
            animate={{ rotate: [45, 405], scale: [1, 1.1, 1] }}
            transition={{
              rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              scale: { duration: 3, repeat: Infinity },
            }}
          />
          <motion.div
            className="absolute bottom-32 left-[20%] w-12 h-12 border-2 border-primary/30 rounded-full"
            animate={{ y: [0, 30, 0], x: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-[25%] w-24 h-24 border border-foreground/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          {/* Glowing dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Live Badge with pulse */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent border-[2px] border-foreground mb-8 relative"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 border-2 border-accent"
              animate={{ scale: [1, 1.2], opacity: [0.5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-accent-foreground"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-xs md:text-sm font-bold uppercase text-accent-foreground">
              Live on Ethereum TESTNET
            </span>
            <Sparkles size={14} className="text-accent-foreground" />
          </motion.div>

          {/* Main Title with letter animation */}
          <div className="mb-6 overflow-hidden">
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tighter inline-flex justify-center"
              initial="hidden"
              animate="visible"
            >
              {titleText.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  className="inline-block relative"
                  whileHover={{
                    scale: 1.1,
                    color: "hsl(var(--primary))",
                    textShadow: "0 0 30px hsl(var(--primary))",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Glowing underline */}
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-2"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "60%", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>

          {/* Tagline with stagger */}
          <motion.div
            className="text-lg sm:text-xl md:text-2xl uppercase tracking-[0.3em] text-muted-foreground mb-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {["STAKE", "•", "EARN", "•", "WIN", "•", "REPEAT"].map(
              (word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mx-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ color: "hsl(var(--primary))", scale: 1.1 }}
                >
                  {word}
                </motion.span>
              ),
            )}
          </motion.div>

          {/* Description with typewriter feel */}
          <motion.p
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            The most competitive ETH staking platform. Lock your ETH, earn daily
            rewards, and compete for bonus tiers. Built for serious stakers.
          </motion.p>

          {/* Feature Badges with stagger */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            {badges.map((badge, index) => (
              <motion.div
                key={badge.label}
                className={`${badge.color} px-4 py-2 border-[2px] border-foreground flex items-center gap-2 font-semibold text-xs md:text-sm uppercase relative overflow-hidden group`}
                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
              >
                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  whileHover={{ translateX: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  <badge.icon size={16} />
                </motion.div>
                <span className="hidden sm:inline">{badge.label}</span>
                <span className="sm:hidden">{badge.label.split(" ")[0]}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons with glow */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            <motion.button
              className="btn-primary-web3 text-base md:text-lg flex items-center justify-center gap-2 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 bg-primary/50 blur-xl"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {/* Shine sweep */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="relative z-10"
              >
                <Zap size={20} />
              </motion.div>
              <span
                className="relative z-10"
                onClick={() => setIsWalletModalOpen(true)}
              >
                START STAKING
              </span>
              <ArrowRight size={20} className="relative z-10" />
            </motion.button>

            <motion.button
              className="btn-outline-web3 text-base md:text-lg relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">LEARN MORE</span>
            </motion.button>
          </motion.div>

          {/* Floating Stats with orb */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-6 md:gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            {floatingStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex items-center gap-3 relative group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.1 + index * 0.15 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="p-2 bg-muted border-[2px] border-foreground relative overflow-hidden"
                  whileHover={{ borderColor: "hsl(var(--primary))" }}
                >
                  {/* Icon glow on hover */}
                  <motion.div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <stat.icon size={18} className="text-primary relative z-10" />
                </motion.div>
                <div className="text-left">
                  <motion.p
                    className="text-xl md:text-2xl font-bold"
                    animate={{
                      textShadow: [
                        "0 0 0px transparent",
                        "0 0 10px hsl(var(--primary) / 0.3)",
                        "0 0 0px transparent",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
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
