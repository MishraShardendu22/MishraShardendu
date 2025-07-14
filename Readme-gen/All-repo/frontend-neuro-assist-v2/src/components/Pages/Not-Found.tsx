import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, LogIn, UserPlus, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative text-center"
      >
        <h1 className="text-8xl md:text-9xl font-bold text-primary">404</h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4"
        >
          <h2 className="text-primary text-4xl md:text-5xl font-bold">
            Page Not Found
          </h2>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6 text-lg md:text-xl text-muted-foreground text-center max-w-md"
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="my-8"
      >
        <svg
          width="200"
          height="120"
          viewBox="0 0 200 120"
          className="text-primary"
        >
          <motion.path
            d="M10,90 Q50,40 90,90 T170,90"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
          />
          <motion.circle
            cx="170"
            cy="90"
            r="6"
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.3 }}
          />
          <motion.path
            d="M90,60 L90,30 L105,45 L90,30 L75,45"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 mt-4"
      >
        <Button
          variant="default"
          className="gap-2 hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        >
          <motion.span
            whileHover={{ scale: 1.2, color: "#F472B6" }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            <Home size={18} />
          </motion.span>
          <span>Home</span>
        </Button>
        <Button
          variant="outline"
          className="gap-2 hover:scale-105 transition-transform"
          onClick={() => navigate("/login")}
        >
          <motion.span
            whileHover={{ scale: 1.2, color: "#F472B6" }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            <LogIn size={18} />
          </motion.span>
          <span>Login</span>
        </Button>
        <Button
          variant="secondary"
          className="gap-2 hover:scale-105 transition-transform"
          onClick={() => navigate("/register")}
        >
          <motion.span
            whileHover={{ scale: 1.2, color: "#F472B6" }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            <UserPlus size={18} />
          </motion.span>
          <span>Register</span>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-8"
      >
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="text-muted-foreground gap-2 hover:scale-105 transition-transform"
        >
          <motion.span
            whileHover={{ scale: 1.2, color: "#F472B6" }}
            transition={{ duration: 0.3 }}
            className="inline-block"
          >
            <ArrowLeft size={16} />
          </motion.span>
          <span>Go Back</span>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;