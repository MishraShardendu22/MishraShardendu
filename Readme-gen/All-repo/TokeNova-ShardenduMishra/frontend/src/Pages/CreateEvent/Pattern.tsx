import { motion } from 'framer-motion';

const Pattern = () => {
  return (
    <div>
      <div className="fixed inset-0 -z-10 opacity-5">
        <div
          className={`absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"%3E%3Cg fill="none" stroke="%23D1D5DB" stroke-width="1"%3E%3Cpath d="M0 0h40v40H0z"/%3E%3Cpath d="M0 0h40M0 40h40M0 0v40M40 0v40"/%3E%3C/g%3E%3C/svg%3E')]`}
        />
      </div>
      <div className="fixed inset-0 -z-5 overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-purple-300 blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "5%", opacity: 0.2 }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-indigo-400 blur-3xl"
          animate={{ x: [0, -70, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "40%", right: "10%", opacity: 0.15 }}
        />
      </div>
    </div>
  );
}

export default Pattern
