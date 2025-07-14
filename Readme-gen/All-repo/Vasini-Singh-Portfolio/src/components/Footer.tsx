import { motion } from 'framer-motion';
import { Linkedin, MapPin } from 'lucide-react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    {/* Contact and Social Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4 text-center md:text-left"
                    >
                        <h2 className="text-xl font-bold mb-2">
                            Let's Connect
                        </h2>
                        <p className="text-gray-300 mb-4 text-sm">
                            Interested in collaboration? Reach out!
                        </p>
                        
                        <div className="flex justify-center md:justify-start">
                            <motion.a
                                href="https://www.linkedin.com/in/vasini-singh-18a442205/"
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center text-blue-400 hover:text-blue-300 transition-colors space-x-2 text-sm"
                            >
                                <Linkedin size={24} /> 
                                <span>Connect on LinkedIn</span>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Map Section */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full rounded-xl overflow-hidden shadow-lg"
                    >
                        <div className="relative w-full h-40">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d570.4744068249038!2d80.26404337233717!3d26.508780505279802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c379d0cde7cdd%3A0x98c33c16a1ab1103!2s121%2FC%2F1%2C%20Lakhanpur%2C%20Kalyanpur%2C%20Kanpur%2C%20Uttar%20Pradesh%20208018!5e0!3m2!1sen!2sin!4v1734034971275!5m2!1sen!2sin" 
                                className="absolute inset-0 w-full h-full"
                                style={{ border: 0 }} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            <div className="absolute inset-0 bg-black opacity-20 hover:opacity-0 transition-opacity duration-300 flex items-center justify-center">
                                <MapPin className="text-white" size={32} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Copyright Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-center w-full py-4 mt-6 border-t border-gray-700"
                >
                    <p className="text-xs text-gray-400">
                        © {year} All rights reserved. Designed with ❤️
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;