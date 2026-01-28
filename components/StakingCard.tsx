import { motion } from "framer-motion";
import { Lock, Unlock, TrendingUp, Clock } from "lucide-react";
import { formatEther } from "viem";

interface StakingCardProps {
  userStaked: string;
  userReward: string;
  lockPeriod: string;
  isConnected: boolean;
  onStake: () => void;
  onUnstake: () => void;
  onClaim: () => void;
}

const StakingCard = ({
  lockPeriod,
  userStaked,
  userReward,
  isConnected,
  onStake,
  onUnstake,
  onClaim,
}: StakingCardProps) => {
  let diffTime = new Date(Number(lockPeriod) * 1000).getTime() - Date.now(); // Mock locked state
  let isLocked;

  if (diffTime > 0) {
    isLocked = true;
  } else {
    isLocked = false;
  }

  return (
    <motion.div
      className="card-web3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="section-title text-2xl">🔥 YOUR STAKE</h3>
        <div
          className={`px-3 py-1 border-[2px] border-foreground font-bold text-sm uppercase ${isLocked ? "bg-destructive text-destructive-foreground" : "bg-accent text-accent-foreground"}`}
        >
          {isLocked ? (
            <span className="flex items-center gap-1">
              <Lock size={14} /> LOCKED
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Unlock size={14} /> UNLOCKED
            </span>
          )}
        </div>
      </div>

      {/* Staking Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Staked Amount */}
        <div className="p-4 bg-muted border-[2px] border-foreground">
          <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase mb-2">
            <TrendingUp size={16} />
            STAKED AMOUNT
          </div>
          <p className="text-4xl font-bold">
            {userStaked && typeof userStaked === "bigint"
              ? formatEther(userStaked)
              : "0"}{" "}
            <span className="text-xl">ETH</span>
          </p>
        </div>

        {/* Pending Rewards */}
        <div className="p-4 bg-muted border-[2px] border-foreground">
          <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase mb-2">
            <TrendingUp size={16} className="text-accent" />
            PENDING REWARDS
          </div>
          <p className="text-4xl font-bold text-accent">
            {userReward && typeof userReward === "bigint"
              ? formatEther(userReward).slice(0, 5)
              : "0"}{" "}
            <span className="text-xl">StakeX</span>
          </p>
        </div>
      </div>

      {/* Lock Progress */}
      {/* <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm uppercase font-semibold">
            <Clock size={16} />
            LOCK PROGRESS
          </div>
          <span className="text-sm font-bold">{"65"}%</span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${"lockProgress"}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2 uppercase">
          Unlocks on {new Date(Number(lockPeriod) * 1000).toDateString()}
        </p>
      </div> */}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <motion.button
          onClick={onStake}
          className="btn-primary-web3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!isConnected}
        >
          ⚡ STAKE
        </motion.button>

        <motion.button
          onClick={onUnstake}
          className={`btn-outline-web3 ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
          whileHover={!isLocked ? { scale: 1.02 } : {}}
          whileTap={!isLocked ? { scale: 0.98 } : {}}
          disabled={isLocked || !isConnected}
        >
          <Lock size={16} className="inline mr-1" /> UNSTAKE
        </motion.button>

        <motion.button
          onClick={onClaim}
          className="btn-secondary-web3 bg-accent text-accent-foreground"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!isConnected}
        >
          🎁 CLAIM
        </motion.button>
      </div>

      {!isConnected && (
        <p className="text-center text-muted-foreground text-sm mt-4 uppercase">
          Connect wallet to stake
        </p>
      )}
    </motion.div>
  );
};

export default StakingCard;
