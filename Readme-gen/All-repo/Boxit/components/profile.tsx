"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import SignOut from "./sign-out"

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div>
      <SignOut />
      <h1>Profile</h1>
      <div>Email: {user?.primaryEmailAddress?.emailAddress}</div>
      <div>Verified: {user?.primaryEmailAddress?.verification?.status === "verified" ? "Yes" : "No"}</div>
      <div>User ID: {user?.id}</div>


      <div
        onClick={() => router.push("/dashboard")}
        style={{ cursor: "pointer", color: "blue", marginTop: "16px" }}
      >
        Dashboard
      </div>
    </div>
  );
};

export default Profile;