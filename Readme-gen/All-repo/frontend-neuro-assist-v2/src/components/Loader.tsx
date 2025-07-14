import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Loader = ({ text = 'Loading...' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newValue = prev + Math.random() * 5;
        return newValue > 100 ? 100 : newValue;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-background/70 z-50">
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-solid rounded-full border-t-primary border-r-secondary border-b-accent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        />

        <motion.div
          className="absolute inset-0 w-16 h-16 border-4 border-dotted rounded-full border-primary/30"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        />
      </div>

      <motion.p
        className="mt-6 text-foreground/90 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2, times: [0, 0.2, 0.8, 1] }}
      >
        {text}
      </motion.p>

      <motion.div
        className="mt-4 h-1 bg-muted rounded-full overflow-hidden w-40"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </div>
  );
};

export default Loader;