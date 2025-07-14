import { auth } from "@/auth"

export const FetchName = async () => {
  try{
    const session = await auth()
    console.log(session?.user?.login)
    const username = session?.user?.login as string
    return username;
  }catch(err){
    console.error('Error fetching name:', err)
    return 'Failed to fetch name'
  }
}