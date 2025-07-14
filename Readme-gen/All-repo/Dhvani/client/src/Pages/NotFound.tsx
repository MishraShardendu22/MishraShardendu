import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Droplets, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const floatAnimation = {
    y: [-10, 10],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-2xl w-full bg-card/50 backdrop-blur-sm border-2 shadow-xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="p-8 flex flex-col items-center space-y-8"
        >
          {/* Animated Icons */}
          <motion.div className="relative" animate={floatAnimation}>
            <Heart className="w-24 h-24 text-primary absolute -right-12 top-0 opacity-20" />
            <Droplets className="w-32 h-32 text-primary" />
            <Heart className="w-24 h-24 text-primary absolute -left-12 top-0 opacity-20" />
          </motion.div>

          {/* Text Content */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <h1 className="text-8xl font-bold text-primary">404</h1>
            <h2 className="text-2xl font-semibold text-accent">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              The page you're looking for seems to not exist or has vanished.
            </p>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Our mission to save lives continues.
            </p>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Let's get you back on track.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              className="flex-1 space-x-2 border-primary/20 hover:bg-primary/5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </Button>
            <Button
              size="lg"
              onClick={() => (window.location.href = '/')}
              className="text-gray-600 font-extrabold flex-1 space-x-2 bg-primary hover:bg-primary/75 transition-all duration-300 "
            >
              <Home className=" w-4 h-4" />
              <span>Homepage</span>
            </Button>
          </motion.div>
        </motion.div>
      </Card>
    </div>
  );
};

export default NotFound;