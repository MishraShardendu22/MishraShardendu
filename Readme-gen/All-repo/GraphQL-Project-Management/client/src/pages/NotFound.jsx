/* eslint-disable no-unused-vars */
import React from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center">
      <div className="text-center">
        <Search className="w-24 h-24 text-purple-400 mx-auto mb-8" />
        <h1 className="text-6xl font-bold mb-4 text-purple-400">404</h1>
        <h2 className="text-3xl font-semibold mb-4 text-gray-300">Page Not Found</h2>
        <p className="text-xl text-gray-400 mb-8">Oops! The page you`re looking for doesn`t exist in our GraphQL schema.</p>
        <Link 
          to="/"
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
