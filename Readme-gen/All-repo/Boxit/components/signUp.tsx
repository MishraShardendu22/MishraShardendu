"use client";

import { signUpSchema } from "@/schema/signUpSchema";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignUp = () => {
  const router = useRouter();
  const { signUp, isLoaded, setActive } = useSignUp();
  const [verifying, setIsVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    if (!isLoaded) return;

    setIsSubmitting(true);
    setAuthError(null);

    try {
      await signUp.create({ emailAddress: data.email, password: data.password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setIsVerifying(true);
    } catch (error) {
      console.log(error);
      setAuthError("An error occurred while signing up. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;

    setIsSubmitting(true);
    setVerificationError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({ code: verificationCode });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        setVerificationError("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setVerificationError("An error occurred while verifying your email. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verifying) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-4 text-center">Verify Your Email</h2>
        <p className="mb-4 text-center text-gray-600">We’ve sent a verification code to your email</p>

        {verificationError && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            {verificationError}
          </div>
        )}

        <form onSubmit={handleVerificationSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Verification Code</label>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm"
              placeholder="Enter the 6-digit code"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={async () => {
              if (signUp) {
                await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
              }
            }}
            className="text-blue-600 hover:underline"
          >
            Resend Code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white">
      <h2 className="text-xl font-bold mb-4 text-center">Create Your Account</h2>

      {authError && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className="mt-1 block w-full px-3 py-2 border rounded shadow-sm"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmationPassword ? "text" : "password"}
              {...register("passwordConfirmation")}
              className="mt-1 block w-full px-3 py-2 border rounded shadow-sm pr-10"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmationPassword(!showConfirmationPassword)}
              className="absolute right-2 top-2 text-sm text-gray-600"
            >
              {showConfirmationPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.passwordConfirmation && (
            <p className="text-red-500 text-sm mt-1">{errors.passwordConfirmation.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/sign-in" className="text-blue-600 hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignUp;
