import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import ChatWithAI from "./ChatSystem/ChatWithAI";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { address } = useAccount();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "#") return false;
    return location.pathname === path;
  };
  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-purple-200"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">

          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
            onClick={() => navigateTo("/")}
          >
            <div className="flex items-center gap-2 sm:gap-3 relative">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                className="relative"
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg ring-2 ring-purple-300 ring-opacity-30">
                  <span className="text-white font-bold text-base sm:text-xl">
                    T
                  </span>
                </div>
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
              {!isMobile && (
                <motion.span
                  className="text-xl sm:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                >
                  Tokenova
                </motion.span>
              )}
            </div>
            <ChatWithAI />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Explore", path: "/home" },
              ...(address
                ? [
                    { name: "Create Event", path: "/create-event" },
                    { name: "My Events", path: "/my-events" },
                    { name: "My Ticket", path: "/my-tickets" },
                  ]
                : []),
            ].map((item, index) => (
              <div key={index} className="relative">
                <motion.a
                  onClick={() => navigateTo(item.path)}
                  className="relative font-medium cursor-pointer px-3 py-2 transition-colors z-10"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span
                    animate={{
                      color: isActive(item.path) ? "#9333EA" : "#374151",
                      fontWeight: isActive(item.path) ? 600 : 500,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.name}
                  </motion.span>

                  <AnimatePresence>
                    {isActive(item.path) && (
                      <motion.span
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "100%", opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>

                  {!isActive(item.path) && (
                    <motion.span
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.a>

                <AnimatePresence>
                  {isActive(item.path) && (
                    <motion.div
                      className="absolute inset-0 bg-purple-50 rounded-lg z-0"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="shadow-md rounded-full shadow-purple-200 scale-75 sm:scale-100"
            >
              <ConnectKitButton
                customTheme={{
                  "--ck-connectbutton-background":
                    "linear-gradient(to right, #6366f1, #a855f7, #ec4899)",
                  "--ck-connectbutton-hover-background":
                    "linear-gradient(to right, #4f46e5, #9333ea, #db2777)",
                  "--ck-connectbutton-color": "white",
                  "--ck-connectbutton-border-radius": "9999px",
                  "--ck-connectbutton-font-weight": "600",
                  "--ck-connectbutton-box-shadow":
                    "0 4px 12px rgba(168, 85, 247, 0.2)",
                }}
              />
            </motion.div>

            <motion.button
              className="md:hidden text-gray-700 focus:outline-none bg-purple-50 p-2 rounded-lg"
              onClick={toggleMobileMenu}
              whileTap={{ scale: 0.9 }}
              whileHover={{ backgroundColor: "rgba(233, 213, 255, 0.5)" }}
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>


        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white shadow-lg border-t border-purple-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-4 sm:px-6 py-3">
                <nav className="flex flex-col space-y-1 sm:space-y-2">
                  {[
                    { name: "Explore", path: "/home" },
                    ...(address
                      ? [
                          { name: "Create Event", path: "/create-event" },
                          { name: "My Events", path: "/my-events" },
                          { name: "My Ticket", path: "/my-tickets" },
                        ]
                      : []),
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative overflow-hidden"
                      initial={false}
                    >
                      <motion.a
                        onClick={() => navigateTo(item.path)}
                        className="block py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-medium z-10 relative"
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          animate={{
                            color: isActive(item.path) ? "#9333EA" : "#374151",
                            fontWeight: isActive(item.path) ? 600 : 500,
                            x: isActive(item.path) ? 5 : 0,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          {item.name}
                        </motion.div>
                      </motion.a>

        
                      <AnimatePresence>
                        {isActive(item.path) && (
                          <motion.div
                            className="absolute inset-0 bg-purple-50 border-l-4 border-purple-500"
                            initial={{ x: "-100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "-100%", opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </AnimatePresence>

      
                      {!isActive(item.path) && (
                        <motion.div
                          className="absolute inset-0 bg-purple-50/50"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1, x: 5 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <div className="h-16 sm:h-20"></div>
    </>
  );
};

export default Header;
