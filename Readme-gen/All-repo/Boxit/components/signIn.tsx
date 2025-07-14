"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { signInSchema } from "@/schema/singInSchema";

const SignIn = () => {
  const router = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    alert("Submitting sign-in form...");
    if (!isLoaded) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      console.log("Sign-in result:", result);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setAuthError("Sign-in could not be completed. Please try again.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setAuthError(
          "An error occurred during sign-in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
      <p className="text-sm text-center text-gray-600 mb-6">
        Access your account
      </p>

      {authError && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {authError}
        </div>
      )}

<form onSubmit={handleSubmit(onSubmit, (err) => console.log("Validation errors:", err))}>

        <div>
          <label htmlFor="identifier" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="identifier"
            type="email"
          {...register("email")}
            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="flex items-center mt-1">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-sm text-blue-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white rounded px-4 py-2 text-sm"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-6">
        Don’t have an account?{" "}
        <a href="/sign-up" className="text-blue-600 underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default SignIn;
