/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { motion } from "framer-motion";
import { generateEventDetails } from "./ai";

interface AIGeneratorProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const AIGenerator = ({
  setFormData,
  loading,
  setLoading,
  error,
  setError,
}: AIGeneratorProps) => {
  const [aiPrompt, setAiPrompt] = useState("");

  const handleAIGenerate = async () => {
    if (!aiPrompt) return;
    setLoading(true);
    setError(null);

    try {
      const generatedData = await generateEventDetails(aiPrompt);

      setFormData((prev: any) => ({
        ...prev,
        name: generatedData.name || "",
        description: generatedData.description || "",
        category: generatedData.category || "Other",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        location: "Virtual",
        price: "0.05",
        totalTickets: 100,
        imageUrl: "https://via.placeholder.com/500",
        canBeResold: true,
        royaltyPercent: 10,
      }));
    } catch (err) {
      console.error("Error generating event details:", err);
      setError("Failed to generate event details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="mb-8 p-6 bg-white rounded-xl shadow-md border border-indigo-100 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-bl-3xl"></div>
      <h3 className="text-lg font-bold text-indigo-600 mb-2">
        AI Event Generator
      </h3>
      <p className="text-gray-600 mb-4">
        Describe your event idea, and our AI will generate the details for you.
      </p>
      <textarea
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-300 transition-colors duration-300"
        rows={3}
        placeholder="e.g. A two-day blockchain workshop for beginners"
        value={aiPrompt}
        onChange={(e) => setAiPrompt(e.target.value)}
      ></textarea>
      <button
        type="button"
        className="mt-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-800 transition-colors duration-300 flex items-center justify-center"
        onClick={handleAIGenerate}
        disabled={loading || !aiPrompt}
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </span>
        ) : (
          "Generate Event Details"
        )}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </motion.div>
  );
};

export default AIGenerator;
