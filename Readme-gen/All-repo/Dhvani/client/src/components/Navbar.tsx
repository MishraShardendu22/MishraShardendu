import { Moon, Sun } from "lucide-react"
import { useNavigate } from "react-router-dom"
import LogOut from "./Logout"
import { useThemeStore } from "../store/themeStore"
import { useUserStore } from "../store/useUserStore"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "./GoogleTranslate"

const Navbar = () => {
    const navigate = useNavigate()
    const { theme, toggleTheme } = useThemeStore()
    const user = useUserStore((state: any) => state.user)

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-6 border-b backdrop-blur-sm border-primary/10 
            ${theme === 'light' 
                ? 'bg-white/50 text-gray-900' 
                : 'bg-base-200/50 text-white'
            }`}
        >
            <div className="flex items-center gap-2">
                <img src="/stethoscope.png" className="h-14 w-14"/>
                <button
                    onClick={() => navigate("/")}
                    className={`text-lg md:text-2xl font-bold text-transparent bg-clip-text truncate
                        ${theme === 'light'
                            ? 'bg-gradient-to-r from-gray-900 to-primary/80'
                            : 'bg-gradient-to-r from-white to-primary/50'
                        }`}
                >
                    Dhvani
                </button>
            </div>
            <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleTheme}
                    className={theme === 'light' ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-200'}
                >
                    {theme === "light" ? (
                        <Moon className="w-10 h-10" />
                    ) : (
                        <Sun className="w-10 h-10" />
                    )}
                </Button>
                {user && <LogOut />}
            </div>
        </nav>
    )
}

export default Navbar