import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "WHAT IS STAKEX AND HOW DOES IT WORK?",
    answer: "STAKEX is a Web3 staking platform where users can stake ETH to earn passive rewards. Stake your ETH, lock it for a period, and earn daily compounding rewards paid in ETH.",
  },
  {
    question: "WHAT ARE THE MINIMUM AND MAXIMUM STAKES?",
    answer: "Minimum stake is 0.01 ETH. Maximum stake per wallet is 100 ETH. You can have multiple active stakes at different lock periods.",
  },
  {
    question: "CAN I WITHDRAW MY STAKE EARLY?",
    answer: "Yes, but early withdrawal incurs a 10% penalty on your staked amount. We recommend waiting for your lock period to complete for maximum returns.",
  },
  {
    question: "HOW ARE REWARDS CALCULATED?",
    answer: "Rewards are calculated at 8% APY, compounding daily. The longer you stake, the more you earn. Bonus tiers provide additional multipliers.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 border-b-[3px] border-foreground">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title mb-2">❓ FREQUENTLY ASKED QUESTIONS</h2>
          <p className="text-muted-foreground uppercase text-sm tracking-wider">
            EVERYTHING YOU NEED TO KNOW
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-[3px] border-foreground overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-4 bg-card text-left font-bold uppercase text-sm hover:bg-muted transition-colors"
              >
                {faq.question}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 bg-muted border-t-[2px] border-foreground">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
