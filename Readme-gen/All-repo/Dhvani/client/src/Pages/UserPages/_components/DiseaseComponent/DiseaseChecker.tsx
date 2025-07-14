"use client";

import { motion } from "framer-motion";
import { useThemeStore } from "@/store/themeStore";
import DiseaseCheckerForm from "./DiseaseCheckerForm";

const DiseaseChecker = () => {
  const { theme } = useThemeStore();

  return (
    <div className="container p-4 mx-auto md:p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8">
        <h1 className={`text-2xl md:text-4xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
          Disease Checker
        </h1>
        <p className={`mt-2 text-sm md:text-base ${theme === "light" ? "text-gray-600" : "text-base-content/70"}`}>
          Submit your symptoms and medical history for AI-powered health analysis
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <DiseaseCheckerForm />
      </motion.div>
    </div>
  );
};

export default DiseaseChecker;
