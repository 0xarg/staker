"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  History as HistoryIcon,
  ArrowUpRight,
  ArrowDownRight,
  Gift,
  ExternalLink,
  Filter,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import WalletModal from "@/components/WalletModal";
import { useWallet } from "@/contexts/WalletContext";
import { toast } from "@/hooks/use-toast";

const History = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const { connect } = useWallet();

  const transactions = [
    {
      id: "0x1a2b...3c4d",
      type: "stake",
      action: "Stake",
      amount: "2.5 ETH",
      date: "Jan 19, 2026 14:32",
      status: "Confirmed",
    },
    {
      id: "0x2b3c...4d5e",
      type: "claim",
      action: "Claim Reward",
      amount: "0.125 ETH",
      date: "Jan 18, 2026 10:15",
      status: "Confirmed",
    },
    {
      id: "0x3c4d...5e6f",
      type: "stake",
      action: "Stake",
      amount: "5.0 ETH",
      date: "Jan 15, 2026 09:45",
      status: "Confirmed",
    },
    {
      id: "0x4d5e...6f7g",
      type: "claim",
      action: "Claim Reward",
      amount: "0.350 ETH",
      date: "Jan 12, 2026 16:22",
      status: "Confirmed",
    },
    {
      id: "0x5e6f...7g8h",
      type: "unstake",
      action: "Unstake",
      amount: "3.0 ETH",
      date: "Jan 10, 2026 11:08",
      status: "Confirmed",
    },
    {
      id: "0x6f7g...8h9i",
      type: "stake",
      action: "Stake",
      amount: "8.0 ETH",
      date: "Jan 05, 2026 13:55",
      status: "Confirmed",
    },
  ];

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case "stake":
        return <ArrowDownRight className="text-accent" size={20} />;
      case "unstake":
        return <ArrowUpRight className="text-destructive" size={20} />;
      case "claim":
        return <Gift className="text-primary" size={20} />;
      default:
        return null;
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
          <h1 className="section-title mb-2">📜 TRANSACTION HISTORY</h1>
          <p className="text-muted-foreground uppercase text-sm tracking-wider">
            VIEW ALL YOUR STAKING ACTIVITY
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mr-4">
            <Filter size={16} className="text-muted-foreground" />
            <span className="text-sm uppercase font-semibold text-muted-foreground">
              FILTER:
            </span>
          </div>
          {[
            { key: "all", label: "ALL" },
            { key: "stake", label: "STAKES" },
            { key: "unstake", label: "UNSTAKES" },
            { key: "claim", label: "CLAIMS" },
          ].map((f) => (
            <motion.button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-sm font-bold uppercase border-[2px] border-foreground transition-colors ${
                filter === f.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          className="card-web3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-[3px] border-foreground">
                  <th className="text-left py-4 text-xs uppercase tracking-wider text-muted-foreground">
                    TX HASH
                  </th>
                  <th className="text-left py-4 text-xs uppercase tracking-wider text-muted-foreground">
                    ACTION
                  </th>
                  <th className="text-left py-4 text-xs uppercase tracking-wider text-muted-foreground">
                    DATE
                  </th>
                  <th className="text-right py-4 text-xs uppercase tracking-wider text-muted-foreground">
                    AMOUNT
                  </th>
                  <th className="text-right py-4 text-xs uppercase tracking-wider text-muted-foreground">
                    STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx, index) => (
                  <motion.tr
                    key={tx.id}
                    className="border-b border-muted hover:bg-muted/50 transition-colors"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="py-4">
                      <a
                        href="#"
                        className="flex items-center gap-2 font-mono text-sm hover:text-primary transition-colors"
                      >
                        {tx.id}
                        <ExternalLink size={14} />
                      </a>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        {getIcon(tx.type)}
                        <span className="font-semibold text-sm uppercase">
                          {tx.action}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {tx.date}
                    </td>
                    <td className="py-4 text-right">
                      <span
                        className={`font-bold ${
                          tx.type === "unstake"
                            ? "text-destructive"
                            : tx.type === "claim"
                              ? "text-primary"
                              : "text-accent"
                        }`}
                      >
                        {tx.type === "unstake" ? "-" : "+"}
                        {tx.amount}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <span className="px-2 py-1 text-xs font-bold uppercase bg-accent text-accent-foreground border-[2px] border-foreground">
                        {tx.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground uppercase">
                No transactions found
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t-[2px] border-muted">
            <p className="text-sm text-muted-foreground">
              Showing {filteredTransactions.length} transactions
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-bold uppercase border-[2px] border-foreground bg-muted opacity-50 cursor-not-allowed">
                PREV
              </button>
              <button className="px-4 py-2 text-sm font-bold uppercase border-[2px] border-foreground bg-primary text-primary-foreground">
                1
              </button>
              <button className="px-4 py-2 text-sm font-bold uppercase border-[2px] border-foreground bg-transparent">
                2
              </button>
              <button className="px-4 py-2 text-sm font-bold uppercase border-[2px] border-foreground bg-transparent">
                NEXT
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onSelectWallet={(wallet) => {
          connect(wallet);
          toast({ title: "Connected", description: `Connected via ${wallet}` });
        }}
      />
    </div>
  );
};

export default History;
