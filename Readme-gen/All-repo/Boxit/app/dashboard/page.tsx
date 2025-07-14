import Dashboard from "@/components/dashboard"
import { auth } from "@clerk/nextjs/server";

const page = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <div>User not authenticated</div>;
  }

  return (
    <div>
      <Dashboard userId={userId}/>
    </div>
  )
}

export default page
