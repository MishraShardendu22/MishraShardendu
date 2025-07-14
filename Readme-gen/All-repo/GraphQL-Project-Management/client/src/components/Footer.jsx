/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Twitter, Instagram, MapPin, Github, Code } from 'lucide-react';
import PropTypes from 'prop-types';
import Typed from 'typed.js';

export const Footer = () => {
  const year = new Date().getFullYear();

  useEffect(() => {
    const options = {
      strings: [
        'I am Shardendu Mishra',
        'I am a Programmer', 
        'I am a Developer', 
        'I am a CP Enthusiast'
      ],
      typeSpeed: 40,
      backSpeed: 20,
      loop: true,
    };

    const typed = new Typed('#typed-element', options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h2 
              id="typed-element" 
              className="mt-2 text-2xl font-bold text-purple-400 w-full min-w-[300px] h-[40px] overflow-hidden"
            ></h2>
            <div className="flex items-center space-x-2">
              <MapPin className="hover:text-yellow-400 transition-colors duration-500 text-lg hover:duration-500 text-indigo-600 ease-in-out" size={24} />
              <p className="align-middle text-indigo-600 mt-2.5 text-xl">Location: Indian Institute of Information Technology Dharwad</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-purple-300">Connect with me</h3>
              <div className="flex space-x-3">
                <SocialLink href="https://leetcode.com/u/ShardenduMishra22/" icon={<Code className="hover:text-yellow-400 transition-colors duration-500 text-lg hover:duration-500 text-indigo-600 ease-in-out" size={24} />} label="LeetCode" text="Explore my LeetCode profile" />
              </div>
              <div className="flex space-x-3">
                <SocialLink href="https://github.com/ShardenduMishra22" icon={<Github className="hover:text-yellow-400 transition-colors duration-500 text-lg hover:duration-500 text-indigo-600 ease-in-out" size={24} />} label="GitHub" text="Check out my GitHub" />
              </div>
              <div className="flex space-x-3">
                <SocialLink href="https://www.instagram.com/shardendumishra22?igsh=NHAyZWlvODF1cWs0" icon={<Instagram className="hover:text-yellow-400 transition-colors duration-500 text-lg hover:duration-500 text-indigo-600 ease-in-out" size={24} />} label="Instagram" text="Follow me on Instagram" />
              </div>
              <div className="flex space-x-3">
                <SocialLink href="https://x.com/Shardendu_M" icon={<Twitter className="hover:text-yellow-400 transition-colors duration-500 text-lg hover:duration-500 text-indigo-600 ease-in-out" size={24} />} label="Twitter" text="Connect with me on Twitter" />
              </div>
            </div>
          </div>
          <div className="w-full h-56 md:h-full min-h-[300px] rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4972.567096217221!2d75.02059907264308!3d15.392850793454533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8d3a45986017d%3A0x98a72507dc76b7aa!2sIIIT-Dharwad%20Pond!5e0!3m2!1sen!2sin!4v1727762835442!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="IIIT Dharwad Map"
            ></iframe>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">© {year} <span className="text-purple-400">Shardendu Mishra</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export const SocialLink = ({ href, icon, label, text }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center text-purple-400 hover:text-yellow-400 transition-colors duration-500 text-lg hover:duration-500"
      aria-label={label}
    >
      {icon}
      <span className="ml-2">{text}</span> {/* Add spacing between icon and text */}
    </a>
  );
};

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,  // The icon component
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,  // Text to display
};
