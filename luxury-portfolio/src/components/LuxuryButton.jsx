import { motion } from 'framer-motion';

const LuxuryButton = ({ children, onClick, className = '' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        gold-gradient px-8 py-4 rounded-full font-semibold text-black
        shadow-2xl shadow-gold-300/30 transition-all duration-300
        hover:shadow-gold-300/50 ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default LuxuryButton;
