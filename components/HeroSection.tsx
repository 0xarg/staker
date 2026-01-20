import { motion } from "framer-motion";
import { Zap, Gift, Trophy } from "lucide-react";

interface HeroSectionProps {
  onStakeClick: () => void;
  onClaimClick: () => void;
}

const HeroSection = ({ onStakeClick, onClaimClick }: HeroSectionProps) => {
  const badges = [
    { icon: Zap, label: "INSTANT STAKES", color: "bg-primary" },
    { icon: Gift, label: "ETH REWARDS", color: "bg-secondary text-secondary-foreground" },
    { icon: Trophy, label: "WEEKLY BATTLES", color: "bg-primary" },
  ];

  return (
    <section className="py-16 md:py-24 border-b-[3px] border-foreground">
      <div className="container mx-auto px-4 text-center">
        {/* Main Title */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          STAKEX
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl uppercase tracking-widest text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          STAKE • EARN • WIN • REPEAT
        </motion.p>

        {/* Feature Badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              className={`${badge.color} px-4 py-2 border-[2px] border-foreground flex items-center gap-2 font-semibold text-sm uppercase`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            >
              <badge.icon size={16} />
              {badge.label}
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.button
            onClick={onStakeClick}
            className="btn-primary-web3 text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ⚡ STAKE NOW
          </motion.button>
          <motion.button
            onClick={onClaimClick}
            className="btn-secondary-web3 text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            CLAIM REWARDS
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
