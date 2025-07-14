import { motion } from "framer-motion";

const HeadingForThisPage = () => {
  return (
    <div className="relative overflow-hidden pb-16 pt-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-purple-300 blur-3xl"></div>
          <div className="absolute top-24 -right-24 w-72 h-72 rounded-full bg-indigo-300 blur-3xl"></div>
        </div>
        <div className="grid grid-cols-10 h-full w-full">
          {Array(100)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="border-b border-r border-indigo-100"
              ></div>
            ))}
        </div>
      </div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600">
            Create New Event
          </span>
        </motion.h1>

        {/* Decorative Underline */}
        <motion.div
          className="flex justify-center mt-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="h-1 w-32 md:w-48 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 rounded-full"></div>
        </motion.div>

        {/* Subtitle with animated underline on hover */}
        <motion.p
          className="text-center text-gray-600 mt-6 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Design your blockchain-powered event with customizable options for
          ticketing, access control, and attendee management.
        </motion.p>

        {/* Decorative Elements */}
        <div className="absolute -z-10 top-1/2 left-8 md:left-24 transform -translate-y-1/2">
          <div className="h-16 w-16 border-2 border-indigo-200 rounded-lg rotate-12 opacity-50"></div>
        </div>
        <div className="absolute -z-10 top-1/3 right-8 md:right-24">
          <div className="h-16 w-16 border-2 border-purple-200 rounded-full opacity-50"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeadingForThisPage;
