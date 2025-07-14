import { motion } from "framer-motion";

const VideoSection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-r from-indigo-50 via-white to-purple-50">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-200/30 to-transparent"></div>
            <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-purple-200/30 to-transparent"></div>
            <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-pink-200/30 to-transparent"></div>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        
        {/* Geometric patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-10 left-1/5 w-6 h-6 border-2 border-indigo-500 rounded-md rotate-12"></div>
            <div className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-purple-500 rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/3 w-5 h-5 border-2 border-pink-500 rounded-md rotate-45"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-6">
                Platform Demo
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
                See It In Action
                </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                Watch how our blockchain ticketing platform transforms the event experience for organizers and attendees alike.
            </p>
            </div>

            <motion.div 
            className="relative mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            >
            {/* Enhanced card backdrop with glow effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-2 border-dashed border-indigo-300 rounded-xl rotate-12 animate-pulse"></div>
            <div className="absolute -bottom-12 right-12 w-20 h-20 border-2 border-dashed border-purple-300 rounded-xl -rotate-12 animate-pulse"></div>
            
            {/* Main video container with glass morphism */}
            <div className="relative z-10 p-3 bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-white">
        <div className="relative w-full overflow-hidden rounded-xl">
            <iframe 
            className="w-full h-auto md:h-[600px]"
            src="https://drive.google.com/file/d/1hZ4cpRlBSSZJynY8lbsciPIGSsJpLgFf/preview"
            allow="autoplay"
            ></iframe>
            
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80 hover:opacity-0 transition-opacity">
            <div className="w-20 h-20 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl">
                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"></path>
                </svg>
            </div>
            </div>
        </div>
        </div>
            
            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute top-2/3 right-1/4 w-4 h-4 bg-purple-400 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-70"></div>
            </motion.div>
            
            {/* Call-to-action buttons below video */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white rounded-lg font-medium shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
                <span>Try Demo</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 bg-white/80 backdrop-blur-sm rounded-lg font-medium hover:border-indigo-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                <span>Documentation</span>
                <svg className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
            </div>
        </div>
        
        {/* Animated wave at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="rgba(79, 70, 229, 0.03)" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
        </section>
    );
    };

export default VideoSection;