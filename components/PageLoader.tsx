import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const PageLoader = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <motion.div
          className="text-4xl md:text-5xl font-bold uppercase tracking-tighter"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          STAKEX
        </motion.div>

        {/* Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={32} className="text-primary" />
        </motion.div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-muted border border-foreground overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Loading...
        </p>
      </motion.div>
    </div>
  );
};

export default PageLoader;
