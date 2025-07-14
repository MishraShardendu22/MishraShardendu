/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { setMessage } from "../constants/MessageAndHistoryContext";

const CardFirstTime = ({ title, description }) => {
  const dispatch = useDispatch();
  
  const makeMessage = (e) => {
    e.preventDefault();
    dispatch(setMessage(title));
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={makeMessage}
      className="group w-full max-w-md max-h-max mx-auto overflow-hidden rounded-lg shadow-md transition-all duration-300 cursor-pointer"
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
        <h4 className="text-2x group-hover:duration-300 hover:duration-300 group-hover:text-yellow-500 font-bold text-white flex items-center justify-between">
          {title}
          <ArrowRight className="group-hover:duration-300 hover:duration-300 group-hover:text-yellow-500 w-11 text-white" />
        </h4>
      </div>
      <div className="p-6 bg-white">
        <p className="group-hover:text-black group-hover:duration-300 hover:duration-300 text-gray-600 text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

CardFirstTime.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardFirstTime;