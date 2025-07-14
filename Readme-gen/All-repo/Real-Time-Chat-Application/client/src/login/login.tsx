import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext.tsx";
import { motion } from "framer-motion";
import { LogIn, UserPlus, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Boxes } from "@/components/ui/background-boxes.tsx";
import { RollingLoader } from "@/home/components/navbar.tsx"; // RollingLoader component is used here

const Login = () => {
  const navigate = useNavigate();
  const authContext = useAuth();
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { setAuthUser } = authContext;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      const data = response.data;
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
      } else {
        localStorage.setItem("chatapp", JSON.stringify(data));
        setAuthUser(data);
        setLoading(false);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      {loading ? <RollingLoader/> : <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,grey)] pointer-events-none" />
        <Boxes />
        <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="w-full max-w-md"
          >
            <Card className="bg-black backdrop-blur-lg shadow-xl border-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <CardHeader className="pb-6">
                  <CardTitle className="text-3xl font-extrabold text-center text-white">Login to What's-Gram</CardTitle>
                  <CardDescription className="text-center text-gray-300">
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Input
                        list="email-list" // Added list attribute for autocomplete
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <datalist id="email-list">
                        <option value="shardendumishra1@gmail.com" />
                        <option value="shardendumishra2@gmail.com" />
                      </datalist>
                    </motion.div>
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"} // Toggle between text and password
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />} {/* Eye icon */}
                        </button>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                        disabled={loading}
                      >
                          <LogIn className="mr-2 h-5 w-5" /> Login
                        
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-4 pt-6">
                  <p className="text-sm text-gray-400">Don't have an account?</p>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full bg-transparent border border-indigo-500 text-indigo-300 hover:bg-indigo-500 hover:text-white transition-colors duration-300"
                  >
                    <Link to="/register">
                      <UserPlus className="mr-2 h-5 w-5" /> Register
                    </Link>
                  </Button>
                </CardFooter>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>}
    </>
  );
};

export default Login;
