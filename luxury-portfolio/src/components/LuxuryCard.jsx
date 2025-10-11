import { motion } from 'framer-motion';

const LuxuryCard = ({ children, className = '' }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`
        luxury-card hover:border-gold-300/40
        transition-all duration-500 ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default LuxuryCard;
