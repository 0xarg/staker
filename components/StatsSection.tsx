import { motion } from "framer-motion";
import { Coins, Wallet, Gift, Clock } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  iconColor: string;
  delay: number;
}

const StatCard = ({ label, value, icon: Icon, iconColor, delay }: StatCardProps) => (
  <motion.div
    className="stat-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -4 }}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
          {label}
        </p>
        <p className="text-3xl md:text-4xl font-bold">{value}</p>
      </div>
      <div className={`p-2 border-[2px] border-foreground ${iconColor}`}>
        <Icon size={24} />
      </div>
    </div>
  </motion.div>
);

const StatsSection = () => {
  const stats = [
    {
      label: "TOTAL STAKED",
      value: "1,234.56",
      icon: Coins,
      iconColor: "bg-primary text-primary-foreground",
    },
    {
      label: "YOUR STAKE",
      value: "12.50",
      icon: Wallet,
      iconColor: "bg-accent text-accent-foreground",
    },
    {
      label: "CLAIMABLE REWARDS",
      value: "0.847",
      icon: Gift,
      iconColor: "bg-primary text-primary-foreground",
    },
    {
      label: "UNLOCK TIME",
      value: "5D 12H",
      icon: Clock,
      iconColor: "bg-destructive text-destructive-foreground",
    },
  ];

  return (
    <section className="py-12 border-b-[3px] border-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} delay={0.1 * index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
