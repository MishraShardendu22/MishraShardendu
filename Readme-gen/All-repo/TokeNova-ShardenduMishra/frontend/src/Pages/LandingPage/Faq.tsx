import { motion } from "framer-motion";
import { useState } from "react";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      q: "What makes NFT tickets better than traditional tickets?",
      a: "NFT tickets provide unmatched security through blockchain verification, eliminating counterfeiting. They also enable royalties for event organizers on resales and remain as digital collectibles after the event.",
    },
    {
      q: "Do I need cryptocurrency to purchase tickets?",
      a: "Yes, you'll need ETH in your digital wallet to purchase tickets. We support popular wallets like MetaMask, Coinbase Wallet, and WalletConnect.",
    },
    {
      q: "How do I verify my ticket at the event?",
      a: "Each NFT ticket contains a unique QR code that can be scanned at the venue entrance. Simply present your digital wallet app with the NFT ticket for verification.",
    },
    {
      q: "Can I transfer or resell my ticket?",
      a: "Yes, you can transfer your NFT ticket to another wallet or resell it on our marketplace. A percentage of resales goes back to event organizers as royalties.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-70"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1.5 rounded-full inline-block mb-4">
            FAQ
          </span>
          <h2 className="text-4xl font-bold mb-6 text-gray-800 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our blockchain ticketing platform
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqData.map((item, idx) => (
            <motion.div
              key={idx}
              className="mb-6 bg-white rounded-xl p-1 border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div
                className={`p-5 rounded-xl cursor-pointer ${
                  activeIndex === idx ? "bg-indigo-50" : "bg-white"
                }`}
                onClick={() => toggleAccordion(idx)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">{item.q}</h3>
                  <motion.div
                    animate={{ rotate: activeIndex === idx ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </motion.div>
                </div>

                <motion.div
                  initial={false}
                  animate={{
                    height: activeIndex === idx ? "auto" : 0,
                    opacity: activeIndex === idx ? 1 : 0,
                    marginTop: activeIndex === idx ? 16 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 leading-relaxed">{item.a}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-600 mb-6">Still have questions?</p>
          <button className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300">
            Contact Support
            <svg
              className="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq;