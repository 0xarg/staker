import { motion } from "framer-motion";

const GlowingOrb = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow rings */}
      <motion.div
        className="absolute w-64 h-64 rounded-full border border-primary/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full border border-primary/30"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.2, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full border-2 border-primary/40"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />

      {/* Core orb */}
      <motion.div
        className="relative w-20 h-20"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-primary blur-xl opacity-60" />
        <div className="absolute inset-2 rounded-full bg-primary blur-lg opacity-80" />

        {/* Core */}
        <motion.div
          className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-primary/60 border-2 border-primary-foreground/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {/* Inner shine */}
          <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-primary-foreground/40 blur-sm" />
        </motion.div>
      </motion.div>

      {/* Orbiting particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{ originX: 0.5, originY: 0.5 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        >
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]"
            style={{ x: 40 + i * 15 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default GlowingOrb;
