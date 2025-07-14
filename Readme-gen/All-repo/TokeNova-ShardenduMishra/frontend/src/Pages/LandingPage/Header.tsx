import { ConnectKitButton } from "connectkit";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50
          ? "bg-white/90 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Background Pattern - Enhanced with larger blurs similar to HeadingForThisPage */}
      <div className="absolute inset-0 z-0 opacity-10 overflow-hidden">
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

      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo Section with enhanced animations */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, rotate: -5 }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">T</span>
              </div>
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"
            >
              Tokenova
            </motion.span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {["Features", "FAQ"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-indigo-600 transition-all duration-200 font-medium text-sm tracking-wide relative group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {item}
                <motion.span
                  className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                ></motion.span>
              </motion.a>
            ))}
          </nav>

          {/* Connect Button with enhanced animation */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ConnectKitButton
              customTheme={{
                "--ck-connectbutton-background": "#fff",
                "--ck-connectbutton-color": "#4F46E5",
                "--ck-connectbutton-hover-background": "#F9FAFB",
                "--ck-connectbutton-border-radius": "0.5rem",
                "--ck-connectbutton-box-shadow":
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                "--ck-connectbutton-border": "1px solid #E5E7EB",
              }}
            />
          </motion.div>

          {/* Enhanced Decorative Elements - larger and more similar to HeadingForThisPage */}
          <div className="absolute -z-10 top-1/2 left-8 md:left-24 transform -translate-y-1/2 hidden lg:block">
            <div className="h-16 w-16 border-2 border-indigo-200 rounded-lg rotate-12 opacity-50"></div>
          </div>
          <div className="absolute -z-10 top-1/3 right-8 md:right-24 hidden lg:block">
            <div className="h-16 w-16 border-2 border-purple-200 rounded-full opacity-50"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
