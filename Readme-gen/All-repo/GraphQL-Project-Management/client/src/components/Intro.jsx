/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Layers, GitBranch, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-between">
      <header className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-purple-400">GraphQL Project Hub</h1>
        <p className="text-xl text-gray-300">Elevate your project management with the power of GraphQL</p>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Layers className="w-12 h-12 text-purple-500" />}
            title="Efficient Data Fetching"
            description="Leverage GraphQL's precise data querying to streamline your project workflows."
          />
          <FeatureCard
            icon={<GitBranch className="w-12 h-12 text-purple-500" />}
            title="Flexible Schema"
            description="Adapt your data model on-the-fly with GraphQL's dynamic typing system."
          />
          <FeatureCard
            icon={<Zap className="w-12 h-12 text-purple-500" />}
            title="Real-time Updates"
            description="Stay in sync with your team using GraphQL subscriptions for instant notifications."
          />
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/home')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Go to Home
          </button>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-400">&copy; 2024 GraphQL Project Hub. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold mb-2 text-purple-300">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

FeatureCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Intro;