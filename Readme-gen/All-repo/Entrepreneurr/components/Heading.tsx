'use client'
import { CardContent } from "@/components/ui/card";
import { Rocket, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';


const Heading = () => {

  return (
    <div className="relative border-spacing-2 shadow-none overflow-hidden bg-indigo-950">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-purple-950"/>      
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-10 left-10 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute-bottom-8 right-10 w-72 h-72 bg-purple-600 mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [45, 0, 45]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      <CardContent className="relative flex flex-col items-center px-6 py-8 space-y-12">
        {/* Badge */}
        <motion.div 
          className="flex items-center px-4 py-2 bg-indigo-900/30 backdrop-blur-sm border border-indigo-700/50 rounded-full 
                    shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />
          <span className="text-sm font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to the future of entrepreneurship
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-center leading-tight">
            <motion.span 
              className="p-2 block bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
            > 
              Empowering Tomorrow&#39;s
            </motion.span>
            <motion.span 
              className="block mt-2 bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Innovators, Today <Rocket color="purple" size={100} className="inline-block" />
            </motion.span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-xl text-indigo-200/70 max-w-3xl text-center leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Welcome to Entrepreneur, the ultimate platform for visionaries and changemakers. 
          Whether you&#39;re a budding startup or an established business looking to innovate, 
          our community and resources are tailored to help you thrive.
        </motion.p>
        

        <motion.p 
          className="text-xl text-indigo-200/70 max-w-3xl text-center leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Unearth the visionary startup that turns your biggest challenges into groundbreaking opportunities by searching below !! 
        </motion.p>
      </CardContent>
    </div>
  );
};

export default Heading;