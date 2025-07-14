import { TwitchIcon, GithubIcon } from 'lucide-react';
import { motion} from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-black">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
          <div className="flex items-center gap-2 p-2">
                <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">T</span>
                    </div>
                </motion.div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">Tokenova</span>
                </div>
            <p className="text-gray-600 mb-6">
              The future of decentralized event ticketing
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-400 transition">
                <TwitchIcon size={20} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <FaDiscord size={20} />
              </a> */}
              <a href="#" className="text-gray-600 hover:text-purple-400 transition">
                <GithubIcon size={20} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-purple-400 transition">
                <FaTelegram size={20} />
              </a> */}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">For Organizers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">For Attendees</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">Marketplace</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">Pricing</a></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">API</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">Tutorials</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-purple-400 transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Tokenova. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-purple-400 text-sm transition">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-purple-400 text-sm transition">Terms</a>
            <a href="#" className="text-gray-500 hover:text-purple-400 text-sm transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;