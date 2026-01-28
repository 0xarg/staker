import { motion } from "framer-motion";
import {
  Zap,
  Gift,
  Trophy,
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";

interface HeroSectionProps {
  onStakeClick: () => void;
  onLearnMoreClick?: () => void;
}

const HeroSection = ({ onStakeClick, onLearnMoreClick }: HeroSectionProps) => {
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

  return (
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
            Live on Ethereum Mainnet
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
          {["STAKE", "•", "EARN", "•", "WIN", "•", "REPEAT"].map((word, i) => (
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
          ))}
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
            onClick={onStakeClick}
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
            <span className="relative z-10">START STAKING</span>
            <ArrowRight size={20} className="relative z-10" />
          </motion.button>

          <motion.button
            onClick={onLearnMoreClick}
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
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
