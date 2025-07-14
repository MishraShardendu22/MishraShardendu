"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { useRouter } from "next/navigation";

const Landing = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <SignedIn>
        <p>You are signed in!</p>
        <button
            onClick={() => router.push("/dashboard")}
        >
        </button>
      </SignedIn>
      <SignedOut>
        <p>You are not signed in. Please sign in to access the dashboard.</p>
        <button
            onClick={() => router.push("/sign-in")}
        >
          Sign In
        </button>
        <button
            onClick={() => router.push("/sign-up")}
        >
          Sign Up
        </button>
      </SignedOut>
    </div>
  )
}

export default Landing
