import { motion } from 'framer-motion';
import { Palette, Brain, Code, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import ExperiencePage from './Experience';
import ProjectsPage from './Projects';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const highlights = [
    {
      icon: Palette,
      title: "Creative Design",
      description: "Crafting visually stunning interfaces that capture attention and inspire engagement",
      gradient: "from-pink-500/20 to-purple-500/20"
    },
    {
      icon: Brain,
      title: "Problem Solving",
      description: "Approaching each design challenge with analytical thinking and innovative solutions",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Code,
      title: "Technical Expertise",
      description: "Bridging the gap between design and implementation with technical understanding",
      gradient: "from-green-500/20 to-emerald-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 py-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] animate-pulse" />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-16 relative"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center space-y-8">
          <div className="space-y-4">
            <motion.h1 
              className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
              variants={itemVariants}
            >
              Welcome to My Portfolio
            </motion.h1>
            
            <motion.div 
              className="flex justify-center gap-3"
              variants={itemVariants}
            >
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 px-4 py-1 text-sm">
                UI/UX Designer
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 px-4 py-1 text-sm">
                Based in Kanpur, UP
              </Badge>
            </motion.div>
          </div>

          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            I am <span className="text-blue-400">Vasini Singh</span>, a passionate UI/UX designer who thrives on creativity and innovation. 
            I specialize in crafting designs that blend functionality and aesthetics seamlessly, 
            creating intuitive user experiences that leave a lasting impact.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4 items-center"
            variants={itemVariants}
          >
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 w-48 group"
              onClick={() => {
                const element = document.getElementById('projects-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-48 group border-blue-600/20 text-blue-400 hover:bg-blue-950 hover:text-blue-400"
              onClick={() => {
                const element = document.getElementById('experience-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Experience
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div 
            className="flex justify-center gap-4 pt-4"
            variants={itemVariants}
          />
        </motion.div>

        <Separator className="my-12 bg-gray-800" />

        {/* Highlights Section */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800 h-full hover:border-gray-700 transition-all duration-300">
                <CardContent className="pt-6 space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${highlight.gradient} flex items-center justify-center`}>
                    <highlight.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {highlight.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience and Projects Components */}
        <motion.div variants={itemVariants} id="experience-section">
          <ExperiencePage />
        </motion.div>
        
        <motion.div variants={itemVariants} id="projects-section">
          <ProjectsPage />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;