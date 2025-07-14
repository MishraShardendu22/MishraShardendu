import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { createEvent } from "@/web-3/blockchain";
import Pattern from "./Pattern";
import HeadingForThisPage from "./Heading";
import AIGenerator from "./AI/AI-Genrator";
import CreateEventForm from "./Form/CreateForm";

const CreateEvent = () => {
  const navigate = useNavigate();
  const { address } = useAccount();
  const [useAI, setUseAI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    price: "",
    totalTickets: 100,
    category: "",
    imageUrl: "",
    canBeResold: false,
    royaltyPercent: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) {
      alert("Please connect your wallet to create an event");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const { name, totalTickets, price, canBeResold, royaltyPercent, location, date } =
        formData;

      const numTickets = parseInt(totalTickets.toString(), 10);
      const ticketPrice = parseFloat(price);
      const royalty = parseInt(royaltyPercent.toString(), 10);

      if (isNaN(numTickets) || numTickets <= 0) {
        throw new Error("Total tickets must be a positive number");
      }
      if (isNaN(ticketPrice) || ticketPrice <= 0) {
        throw new Error("Price must be a positive number");
      }
      if (isNaN(royalty) || royalty < 0 || royalty > 100) {
        throw new Error("Royalty percent must be between 0 and 100");
      }

      await createEvent(
        numTickets,
        ticketPrice,
        canBeResold,
        royaltyPercent,
        name,
        name.substring(0, 3).toUpperCase(),
        new Date(date).getTime(),
        location,
      );

      setSuccess(true);
      setTimeout(() => {
        navigate("/my-events");
      }, 2000);
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create event on the blockchain. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 font-sans">
      <div className="absolute inset-0 z-0 opacity-30">
        <Pattern />
      </div>

      <div className="container rounded-3xl mx-auto px-4 md:px-6 py-12 md:py-24 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <HeadingForThisPage />
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center"
              >
                <p className="text-green-700 font-medium">
                  Event created successfully! Redirecting you to your events...
                </p>
              </motion.div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
                {useAI ? "AI-Assisted Creation" : "Create New Event"}
              </h2>

              {/* Fixed Toggle Switch */}
              <div className="flex items-center space-x-3 bg-gray-50 p-2 rounded-lg">
                <span
                  className={`text-sm font-medium ${!useAI ? "text-gray-900" : "text-gray-500"
                    }`}
                >
                  Manual
                </span>
                <label className="relative inline-block w-14 h-7 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useAI}
                    onChange={() => setUseAI(!useAI)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-300 peer-checked:bg-purple-600 rounded-full transition-all duration-300"></div>
                  <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 peer-checked:translate-x-7"></div>
                </label>
                <span
                  className={`text-sm font-medium ${useAI ? "text-gray-900" : "text-gray-500"
                    }`}
                >
                  AI-Assisted
                </span>
              </div>
            </div>

            {useAI && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <AIGenerator
                  setFormData={setFormData}
                  loading={loading}
                  setLoading={setLoading}
                  error={error}
                  setError={setError}
                />
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center"
              >
                {error}
              </motion.div>
            )}

            <CreateEventForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;