/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Instagram, Code } from 'lucide-react';

const Footer = () => {
  const links = [
    { href: "https://www.linkedin.com/in/shardendumishra22/", icon: Linkedin, label: "LinkedIn" },
    { href: "https://leetcode.com/u/ShardenduMishra22/", icon: Code, label: "LeetCode" },
    { href: "https://github.com/ShardenduMishra22", icon: Github, label: "GitHub" },
    { href: "https://www.instagram.com/shardendumishra22?igsh=NHAyZWlvODF1cWs0", icon: Instagram, label: "Instagram" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
         

          <motion.div 
            variants={containerVariants}
            className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 mt-6"
          >
            {links.map((link, index) => (
              <motion.a
                key={index}
                variants={itemVariants}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-24 flex flex-col items-center text-gray-400 hover:text-white transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon className="w-8 h-8 mb-2 group-hover:text-blue-400 transition-colors duration-300" />
                <span className="text-sm font-medium">{link.label}</span>
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-gray-400 text-sm text-center"
          >
            © 2024 Shardendu Mishra. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;