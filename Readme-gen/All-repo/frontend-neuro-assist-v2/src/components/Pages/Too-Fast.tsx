import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, LogIn, UserPlus, ArrowLeft, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const Fast = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-background text-foreground">
      <Card className="w-full max-w-md shadow-lg border-border">
        <CardHeader className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto"
          >
            <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
          </motion.div>

          <CardTitle className="text-2xl font-bold">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Stop! You Are Going Too Fast
            </motion.h1>
          </CardTitle>

          <CardDescription className="text-muted-foreground">
            Please choose where you'd like to go next
          </CardDescription>
        </CardHeader>

        <CardContent>
          <motion.div
            className="space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <Button
                onClick={() => navigate('/')}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                <span>Go to Landing Page</span>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                onClick={() => navigate('/login')}
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Go to Login</span>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                onClick={() => navigate('/register')}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                <span>Go to Register</span>
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                onClick={() => navigate(-1)}
                variant="outline"
                className="w-full border-border hover:bg-muted flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fast;