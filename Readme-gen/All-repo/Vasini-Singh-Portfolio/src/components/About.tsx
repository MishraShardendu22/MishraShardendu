import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Download, Target, ExternalLink, User2, Briefcase, MapPinned } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import Info from '../Data/Info';
import Professional_Summary from '../Data/ProfessionalSummary';
import Contact from './ContactMe';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

  const handleResumeDownload = () => {
    const filePath = 'src/VasiniProfile.pdf';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'Vasini_Singh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const skills = [
    "User-Centered Design",
    "Responsive Interface Creation",
    "Design Systems Development",
    "Interactive Prototyping"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 py-16 px-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto space-y-12 relative"
      >
        <motion.div variants={itemVariants} className="relative overflow-hidden">
          <div className="flex flex-col items-center space-y-6 text-center">
            <motion.div 
              className="w-56 h-56 rounded-full overflow-hidden shadow-2xl border-4 border-gray-800"
              whileHover={{ scale: 1.00 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img 
                src="/VasiniProfile.png"
                alt="Vasini Singh Profile" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <motion.h1 
                className="text-6xl font-bold text-white"
                variants={itemVariants}
              >
                Vasini Singh
              </motion.h1>
              
              <motion.div className="flex items-center justify-center gap-2" variants={itemVariants}>
                <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20">
                  UI/UX Designer
                </Badge>
                <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20">
                  Creative Technologist
                </Badge>
              </motion.div>

              <motion.p 
                className="text-gray-400 leading-relaxed text-lg"
                variants={itemVariants}
              >
                Transforming complex design challenges into intuitive, visually stunning digital experiences that tell a compelling story.
              </motion.p>
            </div>
          </div>
          
          <Separator className="my-12 bg-gray-800" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            variants={itemVariants}
            className="md:col-span-2 space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-semibold text-white">Professional Summary</h2>
            </div>
            
            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
              <CardContent className="space-y-6 pt-6">
                <p className="text-gray-300 leading-relaxed">
                  {Professional_Summary.content}
                </p>
                
                <Separator className="my-6 bg-gray-800" />
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-4">Core Skills</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2 p-3 rounded-xl bg-gray-800/50 border border-gray-700 backdrop-blur-sm hover:bg-gray-800/70 transition-colors"
                      >
                        <Target className="text-blue-400 h-5 w-5" />
                        <span className="text-sm text-gray-300">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleResumeDownload}
                  className="w-full bg-gradient-to-r from-gray-900 to-blue-900 text-white hover:from-gray-800 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <User2 className="h-6 w-6 text-blue-400" />
              <h2 className="text-2xl font-semibold text-white">Details</h2>
            </div>

            <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-blue-400">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Mail, text: Info.email, type: 'email' },
                  { icon: Phone, text: Info.phone, type: 'phone' },
                  { 
                    icon: Linkedin, 
                    text: Info.linkedIn, 
                    type: 'link',
                    href: "https://www.linkedin.com/in/vasini-singh-18a442205/"
                  }
                ].map(({ icon: Icon, text, type, href }) => (
                  <motion.div
                    key={type}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 text-gray-300 group"
                  >
                    <Icon className="text-blue-400 h-5 w-5" />
                    {type === 'link' ? (
                      <a 
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 group-hover:text-blue-400 transition-colors"
                      >
                        {text}
                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ) : (
                      <span>{text}</span>
                    )}
                  </motion.div>
                ))}
              </CardContent>
              <Separator className="my-4 bg-gray-800" />
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <MapPinned className="text-blue-400 h-5 w-5" />
                    <h3 className="text-lg font-medium text-white">Location</h3>
                  </div>
                  <motion.div 
                    className="flex items-center gap-3 pl-8"
                    whileHover={{ x: 5 }}
                  >
                    <div>
                      <p className="pb-2 font-medium text-gray-300">{Info.currentPosition}</p>
                      <p className="pt-3 text-sm text-gray-400">{Info.location}</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Contact />
      </motion.div>
    </div>
  );
};

export default About;