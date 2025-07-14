/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Globe, Zap } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color, delay }: {
  icon: any;
  title: string;
  description: string;
  color: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 hover:border-gray-700 transition-all duration-300 overflow-hidden group shadow-lg">
      <CardHeader className="space-y-1">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{description}</p>
        <motion.div
          className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-500 to-purple-500 mt-4 transition-all duration-300"
          whileHover={{ width: "100%" }}
        />
      </CardContent>
    </Card>
  </motion.div>
);

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 relative overflow-hidden flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 flex items-center justify-center opacity-20 pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
      >
        <Globe className="w-[20rem] h-[20rem] text-blue-500" />
      </motion.div>

      <div className="container mx-auto px-4 py-16 space-y-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8 flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Badge className="mb-4 bg-blue-500/10 text-blue-500 border-blue-500/20 backdrop-blur-sm">
              News Platform 2024
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                News Aggregator Hub
              </span>
            </h1>
            
            <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Your personalized gateway to curated news from across the web, powered by advanced AI technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pt-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={Globe}
              title="Global Coverage"
              description="Access diverse perspectives from international sources"
              color="bg-purple-500"
              delay={0.4}
            />
            <FeatureCard
              icon={Zap}
              title="Real-time Updates"
              description="Stay informed with lightning-fast news delivery"
              color="bg-pink-500"
              delay={0.6}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-8"
          >
            <Link to="/SelectedNews">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <span className="mr-2">Explore Latest News</span>
                <motion.div
                  className="inline-block"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;