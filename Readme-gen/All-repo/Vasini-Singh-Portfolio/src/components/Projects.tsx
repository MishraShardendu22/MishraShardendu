import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, Library, Star } from 'lucide-react';
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Projects from '../Data/Projects';

interface Project {
  title: string;
  githubLink?: string;
  liveLink?: string;
  description: string[];
  technologies?: string[];
}

const ProjectCard = ({ project, index, isLeft }: { project: Project; index: number; isLeft: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{
        duration: 0.01,
        delay: index * 0.01,
        type: "spring",
        stiffness: 100 
      }}
      className={`relative group w-full lg:w-[calc(50%-3rem)] ${isLeft ? 'lg:mr-auto' : 'lg:ml-auto'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated timeline dot */}
      <motion.div 
        animate={{
          scale: isHovered ? 1.5 : 1,
          rotate: isHovered ? 180 : 0
        }}
        className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      >
        <div className="relative w-4 h-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-30"></div>
        </div>
      </motion.div>

      <Card 
        className="relative bg-gray-900/80 backdrop-blur-xl border-gray-800 hover:border-blue-500/50 transition-all duration-500 group overflow-hidden"
      >
        {/* Ambient light effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-20 transition duration-700 blur-2xl"></div>
        
        <CardContent className="relative p-6 z-10">
          <motion.div 
            className="flex justify-between items-start mb-6"
          >
            <div className="flex items-start space-x-4">
              <motion.div 
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg shadow-blue-500/10"
              >
                <Library className="h-8 w-8 text-blue-400" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl blur-lg"></div>
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-400">Project Overview</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              {project.githubLink && (
                <Button
                  variant="ghost" 
                  size="icon"
                  className="rounded-xl hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300"
                  asChild
                >
                  <a 
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {project.liveLink && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300"
                  asChild
                >
                  <a 
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          <div className="space-y-4 text-gray-300 mb-6">
            {project.description.map((desc, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="h-5 w-5 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-purple-400 transition-colors"></div>
                </div>
                <p className="text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>

          {project.technologies && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <Badge 
                  key={idx}
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-full px-3 py-1 text-xs font-medium border border-blue-500/20"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

const ProjectsPage = () => {
  return (
    <Card className="mx-auto border-gray-800 bg-gray-900/50 backdrop-blur-lg">
      <CardContent className="p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-12"
          >
            Project Showcase
          </motion.h1>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 blur-lg opacity-20"></div>
            </div>

            <div className="h-[600px] overflow-y-auto pr-6 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-800">
              <div className="space-y-12 relative">
                {Projects.map((project, index) => (
                  <ProjectCard 
                    key={index} 
                    project={project} 
                    index={index}
                    isLeft={index % 2 === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ProjectsPage;