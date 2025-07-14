import { auth, signIn, signOut } from "@/auth"
import Link from "next/link"
import { LogOut, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const Navbar = async () => {
  const session = await auth()

  return (
    <header className="backdrop-blur-md bg-gradient-to-b from-black/90 to-black/80 sticky top-0 z-50 border-b border-gray-800/60 shadow-lg shadow-black/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="transform transition-all duration-300">
            <Link href="/" className="flex items-center group relative">
              <div className="font-extrabold text-4xl relative  text-transparent m-2 bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-indigo-400 hover:via-purple-500 hover:to-pink-500 transition-all duration-700">
                Entepreneurr
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-700"></div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {session && session?.user ? (
              <>

                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="group relative px-4 py-2 hover:bg-gradient-to-r hover:from-gray-800/40 hover:to-gray-900/40 rounded-lg transition-all duration-300"
                        >
                          <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-400 transform group-hover:scale-110 transition-all" />
                          <span className="ml-2 hidden text-gray-400 group-hover:text-red-400 font-medium tracking-wide transition-colors sm:block">
                            Logout
                          </span>
                          <div className="absolute inset-0 rounded-lg ring-1 ring-white/10 group-hover:ring-red-500/20 transition-all duration-300" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent sideOffset={4} className="bg-gray-900/95 text-gray-200 border border-gray-800 shadow-xl">
                        Sign Out
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </form>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/user/${session?.user?.id}`}>
                        <div className="relative group">
                          <Avatar className="h-9 w-9 ring-2 ring-gray-700/60 group-hover:ring-blue-500/70 transform group-hover:scale-105 transition-all duration-300">
                            {session?.user?.image ? (
                              <AvatarImage 
                                src={session.user.image} 
                                alt={session?.user?.name || ""} 
                                className="object-cover group-hover:scale-110 transition-all duration-300"
                              />
                            ) : (
                              <AvatarFallback className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 text-blue-400 font-medium group-hover:from-blue-600/30 group-hover:to-blue-700/30 transition-all">
                                {session?.user?.name?.charAt(0) || "U"}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <div className="absolute inset-0 rounded-full ring-1 ring-white/20 group-hover:ring-blue-500/30 transition-all duration-300" />
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={4} className="bg-gray-900/95 text-gray-200 border border-gray-800 shadow-xl">
                      Profile
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <Button 
                  type="submit"
                  className="group relative px-5 py-2.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 text-white font-medium tracking-wide shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transform hover:translate-y-[-1px] transition-all duration-300"
                >
                  <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Login
                  <div className="absolute inset-0 rounded-lg ring-1 ring-white/20 group-hover:ring-white/40 transition-all duration-300" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar