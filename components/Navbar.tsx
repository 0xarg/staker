"use client";
import { motion } from "framer-motion";
import { Wallet, LogOut, Copy, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  onConnectClick: () => void;
}

const Navbar = ({ onConnectClick }: NavbarProps) => {
  const { isConnected, walletAddress, disconnect } = useWallet();
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  // const wallet = getWall

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Stake", path: "/stake" },
    { name: "Rewards", path: "/rewards" },
    { name: "History", path: "/history" },
  ];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress ?? "");
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    });
    setShowDropdown(false);
  };

  const handleDisconnect = () => {
    disconnect();
    console.log(isConnected);
    setShowDropdown(false);
    toast({
      title: "Disconnected",
      description: "Wallet disconnected successfully",
    });
  };

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, []);

  return (
    <nav className="bg-secondary border-b-[3px] border-foreground sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="text-secondary-foreground font-bold text-2xl uppercase tracking-tighter"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              STAKEX
            </motion.div>
          </Link>

          {/* Nav Links - Only show when connected */}
          {isConnected && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={link.path}
                    className={`nav-link text-secondary-foreground ${location.pathname === link.path ? "text-primary" : ""}`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Wallet Button */}
          <div className="relative">
            {isConnected ? (
              <>
                <motion.button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="wallet-chip"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Wallet size={18} />
                  <span className="text-sm">
                    {formatAddress(walletAddress ?? "")}
                  </span>
                  <ChevronDown size={16} />
                </motion.button>

                {showDropdown && (
                  <motion.div
                    className="absolute right-0 mt-2 w-48 bg-popover border-[2px] border-foreground shadow-lg z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <button
                      onClick={copyAddress}
                      className="w-full flex items-center gap-2 px-4 py-3 text-popover-foreground hover:bg-secondary transition-colors text-sm font-semibold uppercase"
                    >
                      <Copy size={16} /> Copy Address
                    </button>
                    <button
                      onClick={handleDisconnect}
                      className="w-full flex items-center gap-2 px-4 py-3 text-destructive hover:bg-secondary transition-colors text-sm font-semibold uppercase border-t-[2px] border-foreground"
                    >
                      <LogOut size={16} /> Disconnect
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.button
                onClick={onConnectClick}
                className="wallet-chip cursor-pointer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Wallet size={18} />
                <span className="text-sm">CONNECT WALLET</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
