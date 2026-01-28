import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 bg-secondary">
      <div className="  container mx-auto px-4">
        {/* CTA Section */}
        <motion.div
          className="text-center mb-10 p-8 bg-card border-[3px] border-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className=" text-2xl font-bold uppercase mb-2 ">
            STILL HAVE QUESTIONS?
          </h3>
          <p className="text-muted-foreground mb-6">
            Join our community on Discord or Twitter for live support and
            updates!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              className="btn-web3 bg-destructive  px-6 py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              JOIN DISCORD
            </motion.button>
            <motion.button
              className="btn-outline-web3 "
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              FOLLOW TWITTER
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Bottom */}
        <div className="text-center text-muted-foreground text-sm uppercase">
          <p>© 2026 STAKEX. ALL RIGHTS RESERVED.</p>
          <p className="mt-2">BUILT FOR THE WEB3 COMMUNITY</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
