import { motion } from 'framer-motion';
import {
  Heart,
  UserPlus,
  LogIn,
  Droplets,
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MetaData from '@/util/MetaData';

const Landing = () => {
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

  return (
    <div className="min-h-screen bg-background">
      <MetaData
        title="Why Donate Blood? | Our Blood Bank"
        description="Discover why donating blood is vital and how it saves lives."
        keywords="donate blood, save lives, blood donation, Our Blood Bank"
      />
      <motion.header
        className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-destructive/5 via-destructive/10 to-background"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-grid-gray-100/20 bg-[size:20px_20px]" />
        </div>
        <div className="relative text-center space-y-8 p-6 max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="space-y-4">
            <Badge variant="outline" className="px-4 py-1 text-base">
              <Heart className="w-4 h-4 text-destructive mr-2" />
              Your donation matters
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-destructive to-destructive/70">
              Welcome to Our Blood Bank
            </h1>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            Every drop counts. Every donation saves lives.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={() => (window.location.href = '/register')}
              className="bg-destructive hover:bg-destructive/50 w-full sm:w-auto text-lg h-12 transition-all duration-300 ease-in-out hover:shadow-lg "
            >
              <UserPlus className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              Become a Donor
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => (window.location.href = '/login')}
              className="w-full text-gray-500 sm:w-auto text-lg h-12 border-2 hover:bg-background/50 hover:text-destructive transition-all duration-300 ease-in-out hover:border-destructive"
            >
              <LogIn className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              Member Login
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Stats Section */}
      <motion.section
        className="py-20 bg-card border-y"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 p-8">
                <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-destructive/10 rounded-full group-hover:bg-destructive/20 transition-colors" />
                <Droplets className="w-12 h-12 text-destructive mx-auto mb-4 relative z-10" />
                <h3 className="text-3xl font-bold mb-2">500,000+</h3>
                <p className="text-muted-foreground">
                  Lives lost annually due to blood shortage
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 p-8">
                <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-destructive/10 rounded-full group-hover:bg-destructive/20 transition-colors" />
                <Users className="w-12 h-12 text-destructive mx-auto mb-4 relative z-10" />
                <h3 className="text-3xl font-bold mb-2">120,000+</h3>
                <p className="text-muted-foreground">
                  Critical cases requiring immediate transfusion
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 p-8">
                <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-destructive/10 rounded-full group-hover:bg-destructive/20 transition-colors" />
                <Calendar className="w-12 h-12 text-destructive mx-auto mb-4 relative z-10" />
                <h3 className="text-3xl font-bold mb-2">25%</h3>
                <p className="text-muted-foreground">
                  Patients need blood during surgery
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* How Blood Donation Helps Section */}
      <motion.section
        className="py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">
              How Your Blood Donation Helps
            </h2>
            <p className="text-muted-foreground text-lg">
              A single donation can save up to three lives. Your contribution
              makes a real difference.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Emergency Care', 'Cancer Treatment', 'Childbirth Support'].map(
              (title, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-card rounded-xl border hover:shadow-lg transition-shadow"
                >
                  <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{title}</h3>
                  <p className="text-muted-foreground">
                    {index === 0 &&
                      'Critical support for trauma and emergency surgery patients.'}
                    {index === 1 &&
                      'Essential for patients undergoing chemotherapy and treatments.'}
                    {index === 2 &&
                      'Vital support for complicated pregnancies and childbirth.'}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="py-20 bg-destructive/5 border-y"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Make a Difference Today</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join our community of heroes and help ensure that no one suffers due
            to blood shortage.
          </p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Our Blood Bank. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
