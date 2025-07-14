import { SignOutButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation";

const SignOut = () => {
  const router = useRouter();
  
    return (
    <div
        onClick={() => {
            router.push("/");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-200"
    >
      <SignOutButton />
    </div>
  )
}

export default SignOut
