import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import axiosInstance from '@/util/axiosInstance';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // Import react-hot-toast for failure messages
import MetaData from '@/util/MetaData';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Email and Password cannot be empty!');
      return;
    }

    try {
      const res = await axiosInstance.post('/auth/login', {
        email: email,
        password: password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      console.log(err);
      toast.error('Login failed! Please try again.');
    }
  };

  return (
    <div
      className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
    >
      <MetaData title="Login To Our Blood Bank ❣️" />
      <div className="hidden lg:block w-1/2 relative">
        <img
          src="/bloodbank.webp"
          alt="Blood Bank"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-red-500 bg-opacity-30 backdrop-blur-sm">
          <div className="flex flex-col text-black justify-center items-center h-full p-12">
            <Heart className="w-16 h-16 mb-6 animate-pulse" />
            <h1 className="text-5xl underline font-bold text-gray-800 mb-4 text-center">
              Welcome to Our Blood Bank
            </h1>
            <p className="text-3xl font-extrabold text-gray-800 text-center max-w-md">
              Your contribution can save lives.
            </p>
            <p className="text-3xl font-extrabold text-gray-800 text-center max-w-md">
              <strong>Join us in making a difference.</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <Card
          className={`w-full max-w-md mx-8 shadow-lg border-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <CardHeader className="space-y-1 text-center pb-8">
            <h2
              className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Sign in
            </h2>
            <p className={`text-gray-500 ${isDarkMode ? 'text-gray-300' : ''}`}>
              Sign in to your account to continue ❣️
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type={isPasswordVisible ? 'text' : 'password'} // Toggle password visibility
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  <div
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)} // Toggle visibility on click
                    className="absolute right-3 top-3 cursor-pointer"
                  >
                    {isPasswordVisible ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full h-12 bg-red-500 hover:bg-red-600 text-white transition-all"
                >
                  Sign in
                </Button>

                <div className="flex items-center justify-between px-2">
                  <span className="text-sm text-gray-500">
                    New user?
                    <Link
                      to="/register"
                      className="text-red-500 hover:text-red-600 ml-1 transition-colors"
                    >
                      Sign up
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
