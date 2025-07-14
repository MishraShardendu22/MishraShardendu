import { Droplets, Moon, Sun } from "lucide-react"
import { useNavigate } from "react-router-dom"
import LogOut from "./Logout"
import { useThemeStore } from "../store/themeStore"
import { useUserStore } from "../store/store"
import { Button } from "@/components/ui/button"

const Navbar = () => {
    const navigate = useNavigate()
    const { theme, toggleTheme } = useThemeStore()
    const user = useUserStore((state: any) => state.user)

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 border-b backdrop-blur-sm border-primary/10 
            ${theme === 'light' 
                ? 'bg-white/50 text-gray-900' 
                : 'bg-base-200/50 text-white'
            }`}
        >
            <div className="flex items-center gap-2">
                <Droplets className="w-6 h-6 text-primary" />
                <button
                    onClick={() => navigate("/")}
                    className={`text-xl font-bold text-transparent bg-clip-text
                        ${theme === 'light'
                            ? 'bg-gradient-to-r from-gray-900 to-primary/80'
                            : 'bg-gradient-to-r from-white to-primary/50'
                        }`}
                >
                    BloodSphere
                </button>
            </div>
            <div className="flex items-center gap-2">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleTheme}
                    className={theme === 'light' ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}
                >
                    {theme === "light" ? (
                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                    ) : (
                        <Sun className="h-[1.2rem] w-[1.2rem]" />
                    )}
                </Button>
                {user && <LogOut />}
            </div>
        </nav>
    )
}

export default Navbar