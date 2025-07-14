import { motion } from 'framer-motion';
import Chat from "./Pages/Chat";
import Footer from './Components/Footer';

const App = () => {
  return (
    <>
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100"
      >
        <Chat />
      </motion.div>
      < Footer />
    </>
  );
};

export default App;