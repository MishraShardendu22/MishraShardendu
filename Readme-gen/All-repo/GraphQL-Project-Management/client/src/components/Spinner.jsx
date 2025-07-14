/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

const LargePurpleSpinner = ({ size = 80 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 38 38" 
      xmlns="http://www.w3.org/2000/svg"
      stroke="#8B5CF6"
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth="2">
          <circle strokeOpacity=".3" cx="18" cy="18" r="18"/>
          <path d="M36 18c0-9.94-8.06-18-18-18">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  );
};

const CenteredSpinner = ({ message = "Please wait", description = "We're processing your request" }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center max-w-md w-full">
        <LargePurpleSpinner />
        <h2 className="mt-6 text-2xl font-semibold text-gray-800">{message}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>This may take a few moments.</p>
      </div>
    </div>
  );
};

LargePurpleSpinner.propTypes = {
  size: PropTypes.number,
};

CenteredSpinner.propTypes = {
  message: PropTypes.string,
  description: PropTypes.string,
};

export default CenteredSpinner;