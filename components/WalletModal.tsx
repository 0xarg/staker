"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useConnect, useConnectors } from "wagmi";

// interface WalletOption {
//   name: string;
//   icon: string;
// }

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// const wallets: WalletOption[] = [
//   { name: "MetaMask", icon: "🦊" },
//   { name: "WalletConnect", icon: "🔗" },
//   { name: "Coinbase Wallet", icon: "💰" },
//   { name: "Phantom", icon: "👻" },
// ];

const WalletModal = ({ isOpen, onClose }: WalletModalProps) => {
  const connectors = useConnectors();
  const connect = useConnect();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-foreground/80 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-popover border-[3px] border-primary w-full max-w-md p-6 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-popover-foreground hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold uppercase text-popover-foreground mb-2">
                  Connect Wallet
                </h2>
                <p className="text-muted-foreground text-sm uppercase">
                  Choose your preferred wallet
                </p>
              </div>

              {/* Wallet Options */}
              <div className="space-y-3">
                {connectors.map((connector, index) => (
                  <motion.button
                    key={connector.name}
                    onClick={() => {
                      connect.mutate({ connector });
                      onClose();
                    }}
                    className="w-full flex items-center gap-4 p-4 bg-secondary border-[2px] border-muted-foreground hover:border-primary transition-colors text-popover-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* <span className="text-3xl">{wallet.icon}</span> */}
                    {connector.icon && (
                      <img className="h-5 w-5" src={connector.icon} alt=" s" />
                    )}
                    <span className="font-bold uppercase">
                      {connector.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <p className="text-center text-muted-foreground text-xs mt-6 uppercase">
                By connecting, you agree to our Terms of Service
              </p>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WalletModal;
