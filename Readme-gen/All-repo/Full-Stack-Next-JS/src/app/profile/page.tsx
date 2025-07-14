"use client";

import React, { useState } from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Page() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/login');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('An unknown error occurred');
      }
      if (error instanceof Error) {
        toast.error('Logout failed: ' + error.message);
      } else {
        toast.error('Logout failed: An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/users/me');
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error) {
      toast.error('Failed to fetch user details: ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BackgroundBeamsWithCollision>
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-5xl font-bold text-blue-500 mb-4 animate-bounce">
          Sign Up to See Your Profile!
        </h1>
        <p className="text-xl text-gray-700 mb-8 dark:text-gray-300 max-w-2xl">
          Join our amazing community to personalize your experience, track your
          activities, and unlock amazing features! Don’t miss out on the fun and
          start your journey today.
        </p>
        <Link href="/signup">
          <Button variant="default" size="lg" className="bg-green-600 hover:bg-green-700 transition-colors duration-300 shadow-lg">
            Create Your Account Now
          </Button>
        </Link>
        <p className="mt-6 text-gray-500 text-sm">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500 underline hover:text-yellow-400 transition-colors duration-300">
              Log in here
            </span>
          </Link>
        </p>
        <div className="mt-8">
          <Button
            onClick={getUserDetails}
            className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get User Details'}
          </Button>
          {data && (
            <h2 className="p-1 mt-4 rounded bg-green-500">
              <Link href={`/profile/${data}`}>{data}</Link>
            </h2>
          )}
          <Button
            onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default Page;
