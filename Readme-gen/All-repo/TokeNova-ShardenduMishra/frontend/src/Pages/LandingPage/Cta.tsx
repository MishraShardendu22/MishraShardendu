import { ConnectKitButton } from "connectkit";
import { motion } from "framer-motion";

const Cta = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          className="relative rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 animate-gradient-x"></div>

          {/* Background decorations */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 rounded-full bg-indigo-400 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-3xl"></div>

          {/* Decorative dots pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='13' cy='13' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>

          <div className="relative z-10 p-12 md:p-16">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <motion.div
                className="max-w-xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="inline-block px-4 py-1 rounded-full bg-white bg-opacity-20 text-white text-sm font-medium mb-6">
                  Get Started Today
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Ready to transform your events?
                </h2>
                <p className="text-indigo-100 text-xl mb-8 leading-relaxed">
                  Join the future of ticketing with blockchain technology.
                  Create, distribute, and verify tickets seamlessly.
                </p>

                {/* Features list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    "No counterfeiting",
                    "Secondary market royalties",
                    "Digital collectibles",
                    "Seamless verification",
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    >
                      <svg
                        className="w-5 h-5 text-indigo-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-white">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col gap-6 min-w-[250px]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.button
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold hover:bg-gray-50 transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Create Your First Event</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.button>

                <div className="relative group">
                  {/* Custom styling container for ConnectKitButton */}
                  <div className="p-[2px] rounded-xl bg-gradient-to-r from-indigo-200 via-white to-indigo-200">
                    <div className="connectkit-wrapper">
                      <ConnectKitButton />
                    </div>
                  </div>
                </div>

                <p className="text-center text-indigo-200 text-sm mt-2">
                  No credit card required • Set up in minutes
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add styles for animation and ConnectKitButton customization */}
      <style>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }

        /* Target the ConnectKitButton to style it */
        :global(.connectkit-wrapper > button) {
          width: 100% !important;
          padding: 0.75rem 2rem !important;
          font-weight: 600 !important;
          background: white !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          transition: all 0.3s ease !important;
        }

        :global(.connectkit-wrapper > button:hover) {
          transform: translateY(-2px) !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        }
      `}</style>
    </section>
  );
};

export default Cta;
