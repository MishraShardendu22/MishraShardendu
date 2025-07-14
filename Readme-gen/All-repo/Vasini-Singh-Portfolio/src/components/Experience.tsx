import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MapPin, Building, Briefcase, Calendar, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import Experience from "../Data/Experience";

function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 blur-lg opacity-20"></div>
      </div>
      <div className="space-y-12">{children}</div>
    </div>
  );
}

function TimelineItem({ date, description, index }: { date: string; title: string; description: JSX.Element; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.2,
        duration: 0.5,
        type: "spring",
        stiffness: 100 
      }}
      className="relative flex items-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        animate={{
          scale: isHovered ? 1.5 : 1,
          rotate: isHovered ? 180 : 0
        }}
        className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg shadow-blue-500/30"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-30"></div>
      </motion.div>
      <div className="w-1/2 pr-12 text-right">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
            <Calendar className="w-4 h-4 text-blue-400" />
            <p className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              {date}
            </p>
          </div>
        </motion.div>
      </div>
      <div className="w-1/2 pl-12">
        {description}
      </div>
    </motion.div>
  );
}

interface Experience {
  post: string;
  duration: string;
  companyName: string;
  jobDescription: string[];
}

const ExperienceCard = ({ exp }: { exp: Experience }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-gray-800 hover:border-blue-500/50 transition-all duration-500 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-6">
        <div className="flex gap-6">
          <motion.div 
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-20 h-20 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 shadow-lg shadow-blue-500/10"
          >
            <Briefcase className="h-10 w-10 text-blue-400" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl blur-lg"></div>
          </motion.div>
          
          <div className="space-y-3 flex-1">
            <div className="flex items-start justify-between">
              <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                {exp.post}
              </h2>
              <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {exp.duration}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400">
                <Building className="h-4 w-4" />
                <span className="text-sm font-medium">{exp.companyName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span className="text-sm font-medium">Location</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-gray-300">Key Responsibilities</h3>
          </div>
          <ul className="space-y-3">
            {exp.jobDescription.map((desc, idx) => (
              <motion.li 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 text-gray-300 group-hover:text-gray-200"
              >
                <ChevronRight className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">{desc}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const ExperiencePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Card className="h-[600px] mx-auto bg-gray-900/50 backdrop-blur-lg">
        <CardContent className="p-8">
          <Skeleton className="h-10 w-64 mx-auto mb-8 bg-gray-800" />
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 w-full bg-gray-800" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

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
            Professional Journey
          </motion.h1>

          <div className="h-[600px] overflow-y-auto pr-6 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-gray-800">
            <Timeline>
              {Experience.map((exp, index) => (
                <TimelineItem
                  key={index}
                  date={exp.duration}
                  title={exp.post}
                  description={<ExperienceCard exp={exp} />}
                  index={index}
                />
              ))}
            </Timeline>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default ExperiencePage;