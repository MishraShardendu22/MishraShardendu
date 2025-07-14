import React from 'react';
import { Heart, Twitter, Instagram, MapPin, Github, Code } from 'lucide-react';
import PropTypes from 'prop-types';

export const FooterComponent = () => {
  const year = new Date().getFullYear();

  return (
      <footer className="bg-gray-900 h-[100%] mt-40 text-gray-300 pt-4">
        <div className="container mx-auto px-4 mt-10 min-h-[calc(100vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 
                id="typed-element" 
                className="text-3xl font-bold text-purple-400 w-full min-w-[300px] h-[40px] overflow-hidden"
              ></h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <SocialLink href="https://leetcode.com/u/ShardenduMishra22/" icon={<Code size={20} />} label="LeetCode" text="LeetCode" />
                <SocialLink href="https://github.com/ShardenduMishra22" icon={<Github size={20} />} label="GitHub" text="GitHub" />
                <SocialLink href="https://www.instagram.com/shardendumishra22?igsh=NHAyZWlvODF1cWs0" icon={<Instagram size={20} />} label="Instagram" text="Instagram" />
                <SocialLink href="https://x.com/Shardendu_M" icon={<Twitter size={20} />} label="Twitter" text="Twitter" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="text-indigo-400" size={24} />
                <p className="text-indigo-400 text-xl">Indian Institute of Information Technology Dharwad</p>
              </div>
              <div className="space-y-4">
                <p className="text-xl font-semibold flex items-center">
                  Made with <Heart className="inline text-red-500 mx-2" size={24} /> by <strong className='text-indigo-600 px-2'> Shardendu Mishra</strong>
                </p>
                <div className="flex items-center space-x-3">
                  <p className="text-lg font-semibold">Made Using<a href='https://github.com/MishraShardendu22/Important-Information/blob/main/AstroKnowledge.md'><strong className='text-indigo-600 '> Astro.JS</strong></a></p>
                  <img
                      src='https://cdn.sanity.io/images/3do82whm/next/1c2aa4d10fe71c23d7a36f69fc11c419c5f4ac35-1000x667.png?w=960&h=640&fit=clip&auto=format'
                      alt="Astro.js Logo"
                    className="h-10 w-10 object-contain rounded-full bg-white p-1"
                  />
                </div>
              </div>
              <div >
                <div className="flex items-center space-x-3">
                <div className="text-center mt-12">
            <p className="text-gray-400 text-sm">© {year} <span className="text-purple-400 font-semibold">Shardendu Mishra</span>. All rights reserved.</p>
          </div>
                </div>
              </div>
            </div>
            <div className="w-full h-64 lg:h-full min-h-[300px] rounded-lg overflow-hidden shadow-lg">
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
        </div>
      </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  text: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label, text }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center text-purple-400 hover:text-yellow-400 transition-colors duration-300 text-lg group"
    aria-label={label}
  >
    <span className="bg-gray-800 p-2 rounded-full group-hover:bg-purple-700 transition-colors duration-300">
      {icon}
    </span>
    <span className="ml-2 hidden sm:inline">{text}</span>
  </a>
);

SocialLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default FooterComponent;
