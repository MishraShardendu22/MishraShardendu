import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Globe,
  MapPin,
  ShieldCheck,
  Building,
  Hospital,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '@/util/axiosInstance';
import toast from 'react-hot-toast';
import MetaData from '@/util/MetaData';

const AdminPassword = import.meta.env.VITE_ADMIN_PASSWORD as string;

const Register = () => {
  const [role, setRole] = useState('donor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdminPasswordVisible, setIsAdminPasswordVisible] = useState(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  const verifyAdminPassword = () => {
    if (adminPassword === AdminPassword) {
      setIsAdminVerified(true);
      setIsAdminModalOpen(false);
      toast.success('Admin verified successfully!');
    } else {
      toast.error('Incorrect admin password!');
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value;
    setRole(newRole);
    if (newRole === 'admin') {
      setIsAdminModalOpen(true);
      if (!isAdminVerified) {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAddress('');
        setPhone('');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !address || !phone) {
      toast.error('All fields are required!');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (role === 'admin' && !isAdminVerified) {
      toast.error('Please verify admin credentials first!');
      setIsAdminModalOpen(true);
      return;
    }

    const userData = {
      role,
      name,
      email,
      password,
      address,
      phone,
      ...(role === 'organisation' && { organisationName: name, website }),
      ...(role === 'hospital' && { hospitalName: name }),
    };

    try {
      const res = await axiosInstance.post('/auth/register', userData);
      if (res.status < 300) {
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      toast.error('Registration failed! Please try again.');
    }
  };

  const getRoleIcon = () => {
    switch (role) {
      case 'donor':
        return <Heart className="w-6 h-6 text-red-500" />;
      case 'admin':
        return <ShieldCheck className="w-6 h-6 text-red-500" />;
      case 'organisation':
        return <Building className="w-6 h-6 text-red-500" />;
      case 'hospital':
        return <Hospital className="w-6 h-6 text-red-500" />;
      default:
        return <User className="w-6 h-6 text-red-500" />;
    }
  };

  return (
    <div
      className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <MetaData title="Register To Our Blood Bank ❣️" />
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

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card
          className={`w-full max-w-md shadow-xl border-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <CardHeader className="space-y-3 text-center p-8">
            {getRoleIcon()}
            <h2
              className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Sign Up {role === 'admin' && isAdminVerified && 'as Admin'}
            </h2>
            <p
              className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Create your account to continue ❣️
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <select
                  value={role}
                  onChange={handleRoleChange}
                  className={`w-full h-12 px-4 rounded-md border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-200 text-gray-900'
                  } focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors`}
                >
                  <option value="donor">Donor</option>
                  <option value="admin">Admin</option>
                  <option value="organisation">Organisation</option>
                  <option value="hospital">Hospital</option>
                </select>
              </div>

              {(role !== 'admin' || isAdminVerified) && (
                <>
                  <div className="relative">
                    <User
                      className={`absolute left-4 top-3.5 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`h-12 pl-12 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900'
                      } focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                    />
                  </div>

                  <div className="relative">
                    <Mail
                      className={`absolute left-4 top-3.5 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`h-12 pl-12 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900'
                      } focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                    />
                  </div>

                  <div className="relative">
                    <Lock
                      className={`absolute left-4 top-3.5 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <Input
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`h-12 pl-12 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900'
                      } focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                    />
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute right-4 top-3.5"
                    >
                      {isPasswordVisible ? (
                        <EyeOff
                          className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        />
                      ) : (
                        <Eye
                          className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <Lock
                      className={`absolute left-4 top-3.5 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <Input
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`h-12 pl-12 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900'
                      } focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      className="absolute right-4 top-3.5"
                    >
                      {isConfirmPasswordVisible ? (
                        <EyeOff
                          className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        />
                      ) : (
                        <Eye
                          className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                        />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <Phone
                      className={`absolute left-4 top-3.5 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <Input
                      type="tel"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`h-12 pl-12 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900'
                      } focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                    />
                  </div>

                  <div className="relative">
                    <MapPin
                      className={`absolute left-4 top-3.5 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <Input
                      type="text"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`h-12 pl-12 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-white border-gray-200 text-gray-900'
                      } focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                    />
                  </div>

                  {role === 'organisation' && (
                    <div className="relative">
                      <Globe
                        className={`absolute left-4 top-3.5 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      />
                      <Input
                        type="url"
                        placeholder="Website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className={`h-12 pl-12 ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-200 text-gray-900'
                        } focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                      />
                    </div>
                  )}

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="w-full max-w-xs mt-4 bg-red-500 hover:bg-red-600"
                    >
                      Register
                    </Button>
                  </div>
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm text-gray-500">
                      Already a User?
                      <Link
                        to="/login"
                        className="text-red-500 hover:text-red-600 ml-1 transition-colors"
                      >
                        Log In
                      </Link>
                    </span>
                  </div>
                </>
              )}

              <AlertDialog
                open={isAdminModalOpen}
                onOpenChange={setIsAdminModalOpen}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Admin Verification Required
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    Please enter the admin password to verify your identity.
                  </AlertDialogDescription>
                  <div className="space-y-4">
                    <div className="relative">
                      <Lock
                        className={`absolute left-4 top-3.5 h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                      />
                      <Input
                        type={isAdminPasswordVisible ? 'text' : 'password'}
                        placeholder="Admin Password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className={`h-12 pl-12 ${
                          isDarkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                            : 'bg-white border-gray-200 text-gray-900'
                        } focus:ring-2 focus:ring-red-500 focus:border-red-500`}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setIsAdminPasswordVisible(!isAdminPasswordVisible)
                        }
                        className="absolute right-4 top-3.5"
                      >
                        {isAdminPasswordVisible ? (
                          <EyeOff
                            className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                          />
                        ) : (
                          <Eye
                            className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={verifyAdminPassword}>
                      Verify
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
