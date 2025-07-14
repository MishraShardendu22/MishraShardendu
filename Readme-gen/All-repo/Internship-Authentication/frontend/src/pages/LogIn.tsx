/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { sendRequest } from '../util/utils';
import Cookies from 'js-cookie';
import Loader from '@/components/Loading';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, LogIn } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await sendRequest('post', '/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.user));

      if (response?.message === 'Login success') {
        console.log(response.user);
        Cookies.set('jwt', response.token);
        alert('Login successful!');
      } else {
        alert(response?.message || 'Login failed');
      }
    } catch (error) {
      alert('An error occurred while logging in');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center flex justify-center items-center gap-2">
            <LogIn className="h-6 w-6" />
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              New user?{' '}
              <Button 
                variant="link" 
                onClick={() => navigate('/signup')}
                className="p-0 h-auto font-semibold"
              >
                Sign up
              </Button>
            </p>
          </div>
        </CardContent>
      <div className="flex justify-center gap-4 mb-8">
        <Button 
            variant="outline" 
            onClick={() => navigate('/reset')}
            className="flex bg-green-300 items-center gap-2"
        >
            <Lock className="w-4 h-4" />
            Reset Password
        </Button>
      </div>
      </Card>
    </div>
  );
};

export default Login;