import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Toaster } from '@/components/ui/toaster';
import { motion } from 'framer-motion';


const App = () => {
  return (
    <Router>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-900"
      >
        <Navbar />
        <main className="pt-16"> {/* Add padding top to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Toaster />
      </motion.div>
    </Router>
  );
};

export default App;