import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 h-12 px-6 flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
};
