import React from 'react';
import { Github, Linkedin, CheckCircle2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  className?: string;
}

const navVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const linkVariants: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.1,
    transition: { 
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`w-full border-b border-gray-700 bg-gray-800/95 backdrop-blur-sm fixed top-0 z-50 ${className}`}
    >
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div 
          initial="initial"
          whileHover="hover"
          variants={linkVariants}
          className="flex items-center gap-2"
        >
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-gray-200 hover:text-blue-400 hover:bg-gray-700/50"
            asChild
          >
            <a 
              href="https://www.linkedin.com/in/shardendumishra22/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          </Button>
        </motion.div>

        <motion.div 
          className="flex items-center gap-2 text-gray-200"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <CheckCircle2 className="w-6 h-6 text-blue-400" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Todo App
          </h1>
        </motion.div>

        <motion.div 
          initial="initial"
          whileHover="hover"
          variants={linkVariants}
          className="flex items-center gap-2"
        >
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-gray-200 hover:text-blue-400 hover:bg-gray-700/50"
            asChild
          >
            <a 
              href="https://github.com/ShardenduMishra22" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline">Github</span>
            </a>
          </Button>
        </motion.div>
      </nav>
    </motion.div>
  );
};

export default Navbar;