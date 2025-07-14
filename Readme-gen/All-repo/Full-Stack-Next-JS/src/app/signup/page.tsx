"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { toast } from "react-toastify";
import Link from "next/link";
import axios from "axios";
import { ModeToggle } from "@/components/ui/Mode-Toggle"; // Import ModeToggle

export default function SignUpPage() {
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [confirm_password, setConfirm_password] = useState("");
    const [loading, setLoading] = useState(false);
    const [allowBtn, setAllowBtn] = useState(false);
    const router = useRouter();


    useEffect(() => {
        if (user.email.length && user.password.length && user.username.length && confirm_password.length) {
            setAllowBtn(true);
        } else {
            setAllowBtn(false);
        }
    }, [user,confirm_password]);

    const onSignUp = async () => {
        if (user.password !== confirm_password) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup", user);
            if (res.data.error) {
                toast.error(res.data.error);
            } else {
                toast.success("Signup success");
                router.push("/login");
            }
        } catch (error) {
            // console.log("Signup failed", error.message);
            toast.error((error as Error).message);
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
                <ModeToggle />
                <div className="font-semibold container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4">
                    <div className="rounded-2xl bg-gray-400 dark:bg-gray-600 px-8 py-10 shadow-lg text-black dark:text-white w-full">
                        <h1 className="text-4xl text-blue-400 underline font-semibold mb-6 text-center">
                            {loading ? "Processing Request" : "Sign Up"}
                        </h1>
                        <input
                            id="Fullname"
                            type="text"
                            className="block border text-violet-600 rounded-2xl border-gray-300 dark:border-gray-600 w-full p-4 mb-4 placeholder-orange-400 dark:placeholder-orange-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition duration-500"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            name="fullname"
                            placeholder="Full Name"
                        />
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
                        <input
                            id="confirm_password"
                            type="password"
                            className="block border text-violet-600 rounded-2xl border-gray-300 dark:border-gray-600 w-full p-4 mb-4 placeholder-orange-400 dark:placeholder-orange-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition duration-500"
                            name="confirm_password"
                            value={confirm_password}
                            onChange={(e) => setConfirm_password(e.target.value)}  // Corrected line
                            placeholder="Confirm Password"
                        />
                        <button
                            type={allowBtn && !loading ? "submit" : "button"}
                            className="rounded-2xl w-full text-center py-3 bg-green-600 text-white hover:bg-green-700 focus:outline-none my-2 transition duration-500"
                            onClick={onSignUp}
                            disabled={loading}
                        >
                            {loading ? "Processing..." : allowBtn ? "Sign Up" : "Fill all details"}
                        </button>
                        <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                            By signing up, you agree to the{" "}
                            <Link href="/TermsOfService">
                                <span className="text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-500 border-b border-blue-600 dark:border-blue-400 hover:border-yellow-500 dark:hover:border-yellow-500 transition duration-500">
                                    Terms of Service
                                </span>
                            </Link>{" "}
                            and{" "}
                            <Link href="/Privacy-Policy">
                                <span className="text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-500 border-b border-blue-600 dark:border-blue-400 hover:border-yellow-500 dark:hover:border-yellow-500 transition duration-500">
                                    Privacy Policy
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 mt-6">
                        Already have an account?{" "}
                        <Link href="/login">
                            <span className="text-blue-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-yellow-500 border-b border-blue-600 dark:border-blue-400 hover:border-yellow-500 dark:hover:border-yellow-500 transition duration-500">
                                Log in
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}