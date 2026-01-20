import { motion } from "framer-motion";
import { Clock, Users, Coins, Trophy, Shield, AlertTriangle } from "lucide-react";

interface RuleCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const RuleCard = ({ icon: Icon, title, description, delay }: RuleCardProps) => (
  <motion.div
    className="card-web3 flex gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    whileHover={{ y: -4 }}
  >
    <div className="p-2 bg-primary border-[2px] border-foreground h-fit">
      <Icon size={20} className="text-primary-foreground" />
    </div>
    <div>
      <h4 className="font-bold uppercase text-sm mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

const RulesSection = () => {
  const rules = [
    {
      icon: Clock,
      title: "LOCK DURATION",
      description: "Stakes are locked for 7 days minimum. Early withdrawal incurs a 10% penalty.",
    },
    {
      icon: Users,
      title: "STAKE LIMIT",
      description: "Minimum stake: 0.01 ETH. Maximum: 100 ETH per wallet address.",
    },
    {
      icon: Coins,
      title: "REWARD RATES",
      description: "Earn 8% APY on all stakes. Rewards compound daily and auto-accumulate.",
    },
    {
      icon: Trophy,
      title: "BONUS TIERS",
      description: "Stake 10+ ETH for Bronze tier. 50+ ETH for Silver. 100+ ETH for Gold rewards.",
    },
    {
      icon: Shield,
      title: "SECURITY",
      description: "Smart contracts audited by CertiK. Funds secured by multi-sig treasury.",
    },
    {
      icon: AlertTriangle,
      title: "IMPORTANT",
      description: "Stakes cannot be withdrawn during active contests. Plan your investments!",
    },
  ];

  return (
    <section className="py-12 border-b-[3px] border-foreground">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title mb-2">📋 STAKING RULES</h2>
          <p className="text-muted-foreground uppercase text-sm tracking-wider">
            UNDERSTAND HOW STAKEX WORKS
          </p>
        </motion.div>

        {/* Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rules.map((rule, index) => (
            <RuleCard key={rule.title} {...rule} delay={0.1 * index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
