import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="pt-36 pb-24 relative overflow-hidden">
      {/* Enhanced layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>

      {/* Animated mesh gradient */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-200/30 to-transparent"></div>
        <div className="absolute top-1/3 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-purple-200/30 to-transparent"></div>
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-pink-200/30 to-transparent"></div>
      </div>

      {/* Enhanced decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-40 right-1/4 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"
        style={{ animationDelay: "3s" }}
      ></div>

      {/* Geometric patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-1/5 w-6 h-6 border-2 border-indigo-500 rounded-md rotate-12"></div>
        <div className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-purple-500 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-5 h-5 border-2 border-pink-500 rounded-md rotate-45"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 font-medium text-sm mb-6">
              Next Generation Ticketing Platform
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight tracking-tight">
              <span className="block text-gray-900">Redefining</span>
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 relative">
                  Event Ticketing
                  <svg
                    className="absolute -bottom-2 w-full"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,5 Q30,2 60,5 T120,5 T180,5 T240,5 T300,5"
                      fill="none"
                      stroke="url(#wavy-gradient)"
                      strokeWidth="5"
                      className="animate-wave"
                    />
                    <defs>
                      <linearGradient
                        id="wavy-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="50%" stopColor="#9333ea" />
                        <stop offset="100%" stopColor="#4f46e5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>
              <span className="block text-gray-900">with Blockchain</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
              Secure, transparent, and fully decentralized ticketing powered by
              NFT technology. Create, sell, and authenticate event tickets on
              the blockchain with unmatched security.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white rounded-lg font-medium shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 group">
                <span>Explore Events</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 bg-white/80 backdrop-blur-sm rounded-lg font-medium hover:border-indigo-400 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                <span>Create Event</span>
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 group-hover:rotate-45 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Enhanced card backdrop */}
            <div className="absolute -inset-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl transform rotate-2"></div>

            {/* Floating holographic elements */}
            <div className="absolute -top-8 -left-8 w-16 h-16 border-2 border-dashed border-indigo-300 rounded-xl rotate-12 animate-pulse"></div>
            <div
              className="absolute -bottom-12 right-12 w-20 h-20 border-2 border-dashed border-purple-300 rounded-xl -rotate-12 animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute bottom-20 -left-10 w-14 h-14 border-2 border-dashed border-pink-300 rounded-full animate-pulse"
              style={{ animationDelay: "2.5s" }}
            ></div>

            {/* Main card with glass morphism effect */}
            <div className="relative z-10 p-3 bg-white/90 backdrop-blur-lg rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] rotate-1 border border-white">
              <img
                src="/1701178054433.webp"
                alt="NFT Ticket Example"
                className="rounded-xl w-full object-cover shadow-inner h-auto"
              />

              {/* Improved badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white text-xs font-bold py-2 px-4 rounded-full shadow-lg flex items-center gap-1.5 transform hover:scale-105 transition-transform">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="white"
                    strokeWidth="2"
                  />
                  <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" />
                  <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" />
                </svg>
                NFT POWERED
              </div>

              {/* Ticket details overlay */}
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-indigo-100/50">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-semibold text-gray-800">
                    World Music Festival
                  </div>
                  <div className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                    June 15-18
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                  <div className="w-1 h-6 bg-purple-500 rounded-full"></div>
                  <div className="w-1 h-6 bg-pink-500 rounded-full"></div>
                  <div className="ml-2 text-xs text-gray-500">
                    VIP Access Pass #0187
                  </div>
                </div>
              </div>
            </div>

            {/* Floating particles with improved animation */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-float opacity-70"></div>
            <div
              className="absolute top-2/3 right-1/4 w-4 h-4 bg-purple-400 rounded-full animate-float opacity-70"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-70"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-float opacity-70"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute bottom-1/3 right-1/2 w-2 h-2 bg-purple-400 rounded-full animate-float opacity-70"
              style={{ animationDelay: "2.5s" }}
            ></div>
          </motion.div>
        </div>
      </div>

      {/* Animated wave at the bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-auto"
        >
          <path
            fill="rgba(79, 70, 229, 0.03)"
            fillOpacity="1"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,80C672,64,768,64,864,69.3C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
