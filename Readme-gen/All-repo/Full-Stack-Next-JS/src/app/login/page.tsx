"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { ModeToggle } from "@/components/ui/Mode-Toggle"; // Import ModeToggle

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [allowBtn, setAllowBtn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user.email.length && user.password.length) {
      setAllowBtn(true);
    } else {
      setAllowBtn(false);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      console.log("CheckPoint 1 Login");
      console.log("User : ", user.email);

      const res = await axios.post("/api/users/login", user);
      if (res.data.error) {
        throw new Error(res.data.error);
      } else {
        router.push("/profile");
        toast.success("Login success");
      }
    } catch (error) {
      // console.log("Login failed", error.message);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="bg-white dark:bg-black min-h-screen flex flex-col transition-colors duration-500">
        <ModeToggle /> {/* Use ModeToggle here */}
        <div className="font-semibold container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4">
          <div className="rounded-2xl bg-gray-400 dark:bg-gray-600 px-8 py-10 shadow-lg text-black dark:text-white w-full">
            <h1 className="text-4xl text-blue-400 underline font-semibold mb-6 text-center">
              {loading ? "Processing Request" : "Login"}
            </h1>
            <input
              id="email"
              type="text"
              className="block border text-violet-600 rounded-2xl border-gray-300 dark:border-gray-600 w-full p-4 mb-4 placeholder-orange-400 dark:placeholder-orange-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition duration-500"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
            <input
              id="password"
              type="password"
              className="block border text-violet-600 rounded-2xl border-gray-300 dark:border-gray-600 w-full p-4 mb-4 placeholder-orange-400 dark:placeholder-orange-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition duration-500"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
            <button
              type={allowBtn && !loading ? "submit" : "button"}
              className="rounded-2xl w-full text-center py-3 bg-green-600 text-white hover:bg-green-700 focus:outline-none my-2 transition duration-500"
              onClick={onLogin}
              disabled={loading}
            >
              {loading ? "Processing..." : allowBtn ? "Login" : "Fill all details"}
            </button>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Don`t have an account?{" "}
              <Link href="/signup">
                <span className="text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-500 border-b border-blue-600 dark:border-blue-400 hover:border-yellow-500 dark:hover:border-yellow-500 transition duration-500">
                  Sign up
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
