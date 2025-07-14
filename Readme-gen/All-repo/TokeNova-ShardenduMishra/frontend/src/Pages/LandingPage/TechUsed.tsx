const TechSection = () => {
  const technologies = [
    { name: "Ethereum", icon: "🔷" },
    { name: "ReactJS", icon: "⚛️" },
    { name: "Wagmi", icon: "🔌" },
    { name: "Web3.js", icon: "🌐" },
    { name: "Hardhat", icon: "🧢" },
    { name: "OpenZeppelin", icon: "🛡️" },
    { name: "Typescript", icon: "📘" },
    { name: "Shadcn", icon: "🎨" },
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-indigo-50 via-gray-50 to-purple-50 overflow-hidden relative">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        {/* Grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, #6366F1 1px, transparent 1px), 
                           linear-gradient(to bottom, #6366F1 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Dots pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(#A855F7 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
            backgroundPosition: "0 0",
          }}
        ></div>

        {/* Diagonal lines */}
        <div
          className="absolute inset-0 rotate-45 opacity-30"
          style={{
            backgroundImage: `linear-gradient(45deg, #EC4899 25%, transparent 25%)`,
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>

      {/* Geometric shapes */}
      <div className="absolute top-10 left-10 w-16 h-16 border-2 border-indigo-200 rounded-xl rotate-45 opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-purple-200 rounded-full opacity-30"></div>
      <div className="absolute top-1/4 right-1/4 w-8 h-8 border-2 border-pink-200 rounded-md rotate-12 opacity-30"></div>

      {/* Floating circles */}
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-indigo-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-1/4 right-1/3 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute top-2/3 left-2/3 w-16 h-16 bg-pink-200 rounded-full opacity-20 blur-xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 text-sm font-medium mb-4">
            Powered By
          </div>
          <h2 className="text-center text-gray-800 text-3xl md:text-4xl font-bold mb-4">
            Cutting-Edge Technologies
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
          <p className="mt-6 text-gray-600 text-center max-w-2xl">
            Our platform leverages the latest blockchain and web technologies to
            deliver a seamless, secure ticketing experience.
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl overflow-hidden py-6">
          {/* Fade edges for scroll effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-indigo-50 to-transparent"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-purple-50 to-transparent"></div>

          <div className="flex animate-marquee space-x-6">
            {technologies.map((tech, index) => (
              <div
                key={tech.name + index}
                className="flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl py-4 px-8 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-b hover:from-white hover:to-indigo-50 border border-gray-100 group"
              >
                <span className="mr-3 text-2xl opacity-80 group-hover:opacity-100">
                  {tech.icon}
                </span>
                <span className="text-xl font-medium bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                  {tech.name}
                </span>
              </div>
            ))}

            {/* Duplicate for seamless scrolling */}
            {technologies.map((tech, index) => (
              <div
                key={tech.name + "-dup" + index}
                className="flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl py-2 px-8 shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-gradient-to-b hover:from-white hover:to-indigo-50 border border-gray-100 group"
              >
                <span className="mr-3 text-2xl opacity-80 group-hover:opacity-100">
                  {tech.icon}
                </span>
                <span className="text-xl font-medium bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <button className="flex items-center gap-2 px-5 py-2 text-sm text-indigo-600 font-medium border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors duration-300 relative overflow-hidden group">
            <span className="relative z-10">Learn about our tech stack</span>
            <svg
              className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
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
            <div className="absolute inset-0 w-0 bg-indigo-50 group-hover:w-full transition-all duration-300 z-0"></div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
